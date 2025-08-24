import { GoogleGenAI, Type } from "@google/genai";
import type { QuadraticProblem } from '../types';

// IMPORTANT: This check is for the development environment.
// In a production environment, the API key should be set securely.
if (!process.env.API_KEY) {
  console.warn("API_KEY 환경 변수가 설정되지 않았습니다. 플레이스홀더를 사용합니다. Gemini 기능을 사용하려면 API 키를 설정하세요.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    a: { type: Type.INTEGER, description: "x^2의 계수. -5와 5 사이의 0이 아닌 정수." },
    b: { type: Type.INTEGER, description: "x의 계수. -10과 10 사이의 정수. 반드시 a의 배수여야 함." },
    c: { type: Type.INTEGER, description: "상수항. -10과 10 사이의 정수." },
    p: { type: Type.INTEGER, description: "꼭짓점의 x좌표 (h). 반드시 정수여야 합니다." },
    q: { type: Type.INTEGER, description: "꼭짓점의 y좌표 (k). 반드시 정수여야 합니다." },
  },
  required: ["a", "b", "c", "p", "q"],
};

export async function generateQuadraticProblem(): Promise<QuadraticProblem> {
  try {
    const prompt = `중학교 3학년 학생을 위한 y = ax^2 + bx + c 형태의 이차함수 문제를 생성해 주세요.
    계수 'a', 'b', 'c'는 모두 정수여야 합니다.
    'a'는 0이 아니어야 합니다.
    가장 중요한 것은 다음 두 가지 조건을 모두 만족해야 합니다.
    1. 표준형 y = a(x - p)^2 + q로 변환했을 때, 꼭짓점의 좌표 (p, q)가 반드시 정수여야 합니다.
    2. 계수 'b'는 계수 'a'의 배수여야 합니다 (즉, b/a가 정수여야 합니다).
    
    좋은 예시 (p, q가 정수이고, b가 a의 배수):
    - a=2, b=4, c=5  (b/a = 2, p=-1, q=3)
    - a=1, b=-6, c=10 (b/a = -6, p=3, q=1)
    - a=-1, b=4, c=-1 (b/a = -4, p=2, q=3)
    
    나쁜 예시:
    - a=1, b=3, c=1 (p가 -1.5로 정수가 아님)
    - a=2, b=3, c=1 (b가 a의 배수가 아님)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.0,
      },
    });

    const jsonText = response.text;
    const problem = JSON.parse(jsonText) as QuadraticProblem;

    // Basic validation
    if (problem.a === 0 || problem.b % problem.a !== 0) {
      console.error("생성된 문제가 제약 조건을 만족하지 않습니다 (a=0 또는 b가 a의 배수가 아님). 다시 시도합니다.", problem);
      return generateQuadraticProblem(); // Retry
    }
    
    return problem;

  } catch (error) {
    console.error("이차함수 문제 생성 오류:", error);
    // Fallback to a hardcoded problem if API fails
    return { a: 2, b: -8, c: 11, p: 2, q: 3 };
  }
}