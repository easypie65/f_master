import React, { useState, useEffect, useCallback } from 'react';
import { generateQuadraticProblem } from '../../services/geminiService';
import type { QuadraticProblem } from '../../types';
import InteractiveSolutionQuiz from '../quiz/InteractiveSolutionQuiz';

const ConverterActivity: React.FC = () => {
  const [problem, setProblem] = useState<QuadraticProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // By changing the key, we force the quiz component to reset its internal state when a new problem is fetched.
  const [quizKey, setQuizKey] = useState(0); 

  const fetchNewProblem = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProblem(null);
    try {
      const newProblem = await generateQuadraticProblem();
      setProblem(newProblem);
      setQuizKey(prevKey => prevKey + 1); // Increment key to force re-mount
    } catch (err) {
      setError('새로운 문제를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
           <p className="ml-4 text-slate-600">Gemini가 새로운 문제를 생성하고 있습니다...</p>
        </div>
      );
    }

    if (error || !problem) {
      return <p className="text-red-500 text-center">{error || '이용 가능한 문제가 없습니다.'}</p>;
    }
    
    return <InteractiveSolutionQuiz problem={problem} key={quizKey} />;
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">활동 1: 이차함수 변환하기</h1>
      <p className="text-center text-slate-500 mb-8 max-w-3xl mx-auto">
        이차함수의 일반형을 표준형으로 바꾸는 과정을 단계별로 완성해보세요. 빈칸에 알맞은 숫자를 입력하고 '정답 확인'을 눌러 다음으로 진행할 수 있습니다.
      </p>
      {renderContent()}
      <div className="text-center mt-8">
        <button onClick={fetchNewProblem} className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all disabled:loading" disabled={loading}>
          {loading ? '로딩 중...' : '새 문제 받기'}
        </button>
      </div>
    </div>
  );
};

export default ConverterActivity;