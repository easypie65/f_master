import React from 'react';

const ShareActivity: React.FC = () => {
  // Share link: https://padlet.com/easypie65/2025-_-pds0c0oyhccaxoc4
  // Embed link: https://padlet.com/embed/pds0c0oyhccaxoc4
  const padletEmbedUrl = "https://padlet.com/embed/pds0c0oyhccaxoc4";

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">활동 2: 풀이 결과 공유하기</h1>
      <p className="text-slate-600 max-w-3xl mx-auto mb-8">
        '활동 1: 이차함수 변환하기'를 완료한 후, 화면 캡처 도구를 사용하여 최종 결과 화면을 캡처하세요. 그 다음, 아래 패들렛 게시판에 캡처한 이미지를 올려 다른 친구들과 풀이를 공유하고 서로 배워볼 수 있습니다.
      </p>
      <div className="w-full h-[70vh] min-h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
        <iframe
          src={padletEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="이차함수 풀이 결과 공유 패들렛 보드"
          allow="camera;microphone"
        ></iframe>
      </div>
    </div>
  );
};

export default ShareActivity;