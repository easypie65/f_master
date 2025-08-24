import React from 'react';
import ActivityCard from '../ActivityCard';
import EquationIcon from '../icons/EquationIcon';
import GraphIcon from '../icons/GraphIcon';
import CameraIcon from '../icons/CameraIcon';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">이차함수 마스터하기</h1>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
        기본 공식부터 실생활 예시까지, 세 가지 활동을 통해 이차함수에 대한 이해를 높여보세요.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActivityCard 
          to="/converter"
          title="활동 1: 이차함수 변환 & 공유"
          description="AI가 생성한 문제들을 통해 일반형을 표준형으로 바꾸고, 완성된 풀이 과정을 친구들과 공유해보세요."
          icon={<EquationIcon className="w-8 h-8 text-white" />}
          color="bg-blue-500"
        />
        <ActivityCard 
          to="/geogebra"
          title="활동 2: 그래프 탐색하기"
          description="지오지브라를 이용해 계수의 변화에 따라 포물선의 모양과 위치가 어떻게 변하는지 시각적으로 탐색해보세요."
          icon={<GraphIcon className="w-8 h-8 text-white" />}
          color="bg-green-500"
        />
        <ActivityCard 
          to="/padlet"
          title="활동 3: 실생활 속 포물선"
          description="패들렛을 이용해 우리 주변 세상에 있는 이차함수(포물선) 사진을 찾아 공유해보세요."
          icon={<CameraIcon className="w-8 h-8 text-white" />}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default Home;