import { useEffect, useState } from 'react';
import './scroll_indicator.css';

//ScrollIndicator컴포넌트
function ScrollIndicator({url}){
  //useEffectt에서 비동기로 fetch(get요청)
  //서버에서 데이터를 받아옴
  //1. 서버의 주소
  //2. 데이터를 저장할 state
  //3. fetch와 같은 오래 걸리는 작업을 처리할 useEffect
  
  //상태ㅣ 서버데이터, 로딩체크, 에러, 스크롤 위치
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [errMsg, setErrMsg] = useState("");
  let [scrollPercentage, setScrollPercentage] = useState(0);
  
  //useEffect: 컴포넌트 생성/변경/해제 시 코드 삽입
  useEffect(()=>{
    if(url!==''){
      fetchData(url); 
    }
  }, [url])  //url이 바뀔때마다 실행(안적으면 모든 데이터에 대해 실행)

  //스크롤 이벤트 처리
  useEffect(()=>{
    window.addEventListener('scroll',chageScrollEvent)
  })
  function chageScrollEvent(){
    //스크롤의 위치를 감지
    //현재 스크롤 위치
    let scrolled = document.documentElement.scrollTop;
    //창이 작을 수도 있으므로 현재 열려있는 창의 스크롤 범위를 계산
    //전체 스크롤 가능한 범위
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    //(현재 / 전체) * 100 = 퍼센트
    setScrollPercentage((scrolled / height) * 100);
  }
  console.log(scrollPercentage)

  //화면에 영향이 가지 않도록 async로생성
  async function fetchData(getUrl){
    //fetch(Http요청)
    try{
        //서버에 요청을 하기 전에 로딩상태로 만듬
        setLoading(true); //로딩중
        let response = await fetch(getUrl);
        const res_data = await response.json();

        if(res_data && res_data.products){
          setData(res_data.products);
        }
        setLoading(false); //로딩완료
      } catch (error) {
        //에러 발생시 try코드를 수행하다가 에러가 발생하면 즉시 catch로 이동
        setErrMsg(error.message);
        console.log(error.message);
      }    
  }  
  
  // console.log(data);
  if(loading){  //로딩이 true면 
    //컴포넌트도 함수기 때문에 return을 만나면 그 즉시 종료(밑에 코드 실행 x)
    return(
      <div>
        데이터 로딩 중
      </div>
    )
  }

  if(errMsg){ //에러메시지에 내용이 있으면
    return(
      <div>
        {errMsg}
      </div>
    )
  }
  return(
    <>
      <div className='top-nav-container'>
        <h1>Scroll Indicator</h1>
        {/* 스크롤 진행도 전체 범위 */}
        <div className='scroll-progress-tracking'>
          {/* 스크롤의 실제 위치를 퍼센트로 그려줄 박스 */}
          <div className='current-progress-bar' style={{width:`${scrollPercentage}%`}}>

          </div>
        </div>
      </div>

    {/* 스크롤용 데이터 */}
      <div className='data-list'>
        {
          //data를 map을 통해 p 태그로 출력
          //data가 비어있지 않고 길이가  0보다 클떄 p태그 생성
          data && data.length ?
            data.map((item, idx)=>{
              return(
                <p key={item.id}>{item.title}</p>
              )
            })
          : null
        }
      </div>
    </>
  )
}



function test1(){
  return(
    <div>
      test
    </div>
  )
}

//기본 내보내기
export default ScrollIndicator;
//다른 항목들 명시적으로 내보내기
export {test1};