import React from 'react';

const GeoGebraActivity: React.FC = () => {
  // This is the GeoGebra calculator URL requested by the teacher.
  const geogebraEmbedUrl = "https://www.geogebra.org/calculator/a9sd3tha";

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">활동 2: 그래프 탐색하기</h1>
      <p className="text-slate-600 max-w-3xl mx-auto mb-8">
        슬라이더를 움직여 일반형 <code className="font-mono text-sm bg-slate-200 p-1 rounded">y = ax² + bx + c</code>의 계수 <span className="font-mono text-red-500">a</span>, <span className="font-mono text-green-500">b</span>, <span className="font-mono text-blue-500">c</span>의 값이 변할 때 그래프가 어떻게 바뀌는지 확인해보세요. 표준형과 함께 시각적으로 비교할 수 있습니다.
      </p>
      <div className="w-full h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
        <iframe
          src={geogebraEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="지오지브라 그래프 탐색기"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GeoGebraActivity;