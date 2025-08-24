import React, { useState } from 'react';
import type { QuadraticProblem } from '../../types';
import EquationInput from './EquationInput';

// Formatting helpers
const formatNum = (n: number) => {
    if (Number.isInteger(n)) return n.toString();
    const fixed = n.toFixed(3);
    if (fixed.endsWith('000')) return n.toFixed(0);
    if (fixed.endsWith('00')) return n.toFixed(1);
    if (fixed.endsWith('0')) return n.toFixed(2);
    return fixed;
}
const formatSigned = (n: number) => n >= 0 ? `+ ${formatNum(n)}` : `- ${formatNum(Math.abs(n))}`;
const formatFirstCoeff = (n: number) => n === 1 ? '' : (n === -1 ? '-' : formatNum(n));
const formatCoeff = (n: number) => n === 1 ? '+ ' : (n === -1 ? '- ' : formatSigned(n));

const StepDescription = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center my-3 text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <p className="ml-3 font-medium text-center">{children}</p>
    </div>
);

const EquationLine = ({ children, isCurrent }: { children: React.ReactNode, isCurrent?: boolean }) => (
    <div className={`font-mono text-xl sm:text-2xl text-slate-800 p-4 rounded-lg text-center shadow-inner break-words flex items-center justify-center flex-wrap ${isCurrent ? 'bg-blue-50' : 'bg-slate-100'}`}>
        {children}
    </div>
);

type Status = 'idle' | 'correct' | 'incorrect';

const InteractiveSolutionQuiz: React.FC<{ problem: QuadraticProblem }> = ({ problem }) => {
    const { a, b, c, p, q } = problem;
    
    const [currentStep, setCurrentStep] = useState(0);
    const [inputs, setInputs] = useState(['', '', '']);
    const [status, setStatus] = useState<Status>('idle');

    // Calculated values for solution
    const b_div_a = b / a;
    const term_to_add = p * p; // This is (b/2a)^2
    const term_moved_out = -a * term_to_add;

    // Correct answers for each step's inputs
    const answers = [
        [a.toString(), formatNum(Math.abs(b_div_a)), formatNum(Math.abs(c))],
        [formatNum(term_to_add), formatNum(term_to_add)],
        [formatNum(term_moved_out)],
        [formatNum(p), formatNum(q)]
    ];

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        setStatus('idle');
    };

    const handleCheck = () => {
        if (status === 'correct') return;
        const currentAnswers = answers[currentStep];
        const userAnswers = inputs.slice(0, currentAnswers.length);
        
        const isCorrect = userAnswers.every((val, index) => {
            // Handle empty input gracefully
            if (val.trim() === '') return false;
            // Allow for some floating point leniency
            return Math.abs(parseFloat(val) - parseFloat(currentAnswers[index])) < 0.01;
        });

        setStatus(isCorrect ? 'correct' : 'incorrect');
    };

    const handleNext = () => {
        if (status !== 'correct') return;
        setCurrentStep(prev => prev + 1);
        setStatus('idle');
        setInputs(['', '', '']);
    }

    const renderEquationPart = (text: string | number, isAnswer = false) => (
      <span className={`mx-1 ${isAnswer ? 'font-bold text-green-700' : 'text-slate-800'}`}>
        {text}
      </span>
    );

    const renderStep = (stepIndex: number, description: React.ReactNode, equationRenderer: () => React.ReactNode) => {
        if (currentStep < stepIndex) return null;

        return (
            <div className={currentStep > stepIndex ? 'opacity-60 transition-opacity' : ''}>
                <StepDescription>{description}</StepDescription>
                <EquationLine isCurrent={currentStep === stepIndex}>
                    {equationRenderer()}
                </EquationLine>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-2">이차함수 변환 퀴즈</h3>
            <div className="bg-slate-100 p-6 rounded-lg text-center mb-6">
                <p className="text-xl text-slate-600 mb-1">문제</p>
                <p className="text-3xl font-mono font-bold text-slate-800">
                    y = {formatFirstCoeff(a)}x² {formatSigned(b)}x {formatSigned(c)}
                </p>
            </div>
            
            {/* Steps */}
            {renderStep(0, "1. x²의 계수로 묶기", () => (
                <>
                    {renderEquationPart("y =")}
                    {currentStep > 0 ? renderEquationPart(a, true) : <EquationInput value={inputs[0]} onChange={e => handleInputChange(0, e.target.value)} status={status} placeholder="a" />}
                    {renderEquationPart("(x²")}
                    {renderEquationPart(b_div_a >= 0 ? '+' : '-')}
                    {currentStep > 0 ? renderEquationPart(formatNum(Math.abs(b_div_a)), true) : <EquationInput value={inputs[1]} onChange={e => handleInputChange(1, e.target.value)} status={status} placeholder="|b/a|" />}
                    {renderEquationPart("x)")}
                    {renderEquationPart(c >= 0 ? '+' : '-')}
                    {currentStep > 0 ? renderEquationPart(formatNum(Math.abs(c)), true) : <EquationInput value={inputs[2]} onChange={e => handleInputChange(2, e.target.value)} status={status} placeholder="|c|" />}
                </>
            ))}

            {renderStep(1, "2. 괄호 안 완전제곱식 만들기", () => (
                 <>
                    {renderEquationPart(`y = ${formatFirstCoeff(a)}(x² ${formatCoeff(b_div_a)}x`)}
                    {currentStep > 1 ? (
                        renderEquationPart(`+ ${formatNum(term_to_add)} - ${formatNum(term_to_add)}`, true)
                    ) : (
                       <>
                        {renderEquationPart("+")}
                        <EquationInput value={inputs[0]} onChange={e => handleInputChange(0, e.target.value)} status={status} placeholder="?" />
                        {renderEquationPart("-")}
                        <EquationInput value={inputs[1]} onChange={e => handleInputChange(1, e.target.value)} status={status} placeholder="?" />
                       </>
                    )}
                    {renderEquationPart(`) ${formatSigned(c)}`)}
                </>
            ))}

            {renderStep(2, <>3. 필요 없는 상수항 밖으로 내보내기<br/><span className="text-sm font-normal">(부호 포함: 예: +5 또는 -8)</span></>, () => (
                <>
                    {renderEquationPart(`y = ${formatFirstCoeff(a)}(x² ${formatCoeff(b_div_a)}x + ${formatNum(term_to_add)})`)}
                    {currentStep > 2 ? (
                        renderEquationPart(formatSigned(term_moved_out), true)
                    ) : (
                        <EquationInput value={inputs[0]} onChange={e => handleInputChange(0, e.target.value)} status={status} placeholder="+/- ?" />
                    )}
                    {renderEquationPart(formatSigned(c))}
                </>
            ))}
            
            {renderStep(3, "4. 완전제곱식으로 인수분해 & 상수항 정리", () => (
                <>
                    {renderEquationPart(`y = ${formatFirstCoeff(a)}(x`)}
                    {currentStep > 3 ? (
                        renderEquationPart(p !== 0 ? (p > 0 ? `- ${formatNum(p)}` : `+ ${formatNum(Math.abs(p))}`) : '', true)
                    ) : (
                        <>
                         {renderEquationPart("-")}
                         <EquationInput value={inputs[0]} onChange={e => handleInputChange(0, e.target.value)} status={status} placeholder="p" />
                        </>
                    )}
                    {renderEquationPart(")²")}
                    {currentStep > 3 ? (
                        renderEquationPart(q !== 0 ? formatSigned(q) : '', true)
                    ) : (
                        <>
                         {renderEquationPart("+")}
                         <EquationInput value={inputs[1]} onChange={e => handleInputChange(1, e.target.value)} status={status} placeholder="q" />
                        </>
                    )}
                </>
            ))}

             {/* Controls and Final State */}
             <div className="mt-8">
                {currentStep < 4 ? (
                    <div className="text-center">
                        <div className="flex justify-center space-x-4">
                            <button onClick={handleCheck} disabled={status === 'correct'} className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed">
                                정답 확인
                            </button>
                            <button onClick={handleNext} disabled={status !== 'correct'} className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed">
                                다음 단계 →
                            </button>
                        </div>
                        {status === 'incorrect' && (
                            <p className="text-red-500 text-center font-semibold mt-4">앗, 다시 확인해보세요! 숫자가 정확한가요?</p>
                        )}
                    </div>
                ) : (
                    <div className="text-center w-full space-y-8">
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md w-full">
                            <h3 className="font-bold text-xl">🎉 완벽해요! 모든 단계를 완료했습니다!</h3>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-lg shadow-inner">
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">결과 공유하기</h3>
                             <p className="text-slate-600 max-w-2xl mx-auto mb-6 leading-relaxed">
                                현재 풀이 과정을 캡처 도구(예: 윈도우 캡처 도구, macOS의 <kbd className="font-sans bg-slate-200 px-1.5 py-0.5 rounded border border-slate-300">Shift+Command+4</kbd>)로 캡처하세요.
                                <br />
                                그 다음, 아래 패들렛 게시판의 '+' 버튼을 눌러 이미지를 공유해보세요!
                            </p>
                            <div className="w-full h-[600px] bg-white rounded-xl shadow-lg overflow-hidden border">
                                <iframe
                                    src="https://padlet.com/embed/pds0c0oyhccaxoc4"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    title="이차함수 풀이 결과 공유 패들렛 보드"
                                    allow="camera;microphone"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractiveSolutionQuiz;