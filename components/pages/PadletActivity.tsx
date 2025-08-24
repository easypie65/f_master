import React from 'react';

const PadletActivity: React.FC = () => {
  // The correct embed URL is created by taking the ID from the share link and putting it in the embed path.
  // Share link: https://padlet.com/easypie65/2025-3-_-pyilwcxrdsk2vt6r
  // Embed link: https://padlet.com/embed/pyilwcxrdsk2vt6r
  const padletEmbedUrl = "https://padlet.com/embed/pyilwcxrdsk2vt6r";

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">활동 3: 실생활 속 포물선</h1>
      <p className="text-slate-600 max-w-3xl mx-auto mb-8">
        실생활에서 볼 수 있는 포물선(다리, 분수, 던져진 공 등)의 예를 찾아 우리 반 패들렛 게시판에 사진을 올려보세요! 게시판의 분홍색 '+' 버튼을 클릭하여 사진을 추가할 수 있습니다.
      </p>
      <div className="w-full h-[70vh] min-h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
        <iframe
          src={padletEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="실생활 속 포물선 패들렛 보드"
          allow="camera;microphone"
        ></iframe>
      </div>
    </div>
  );
};

export default PadletActivity;