;(function($, window, document, undefined){
    
    class Wedding {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.section10();
            this.section11();
            this.footer();
            this.modal();
        }
        header(){
            $('.mobile-btn').on({
                click(){
                    $('.mobile-menu').toggle();
                }
            })
            $('.mobile-alink').on({
                click(){
                    $('.mobile-menu').slideUp(0);
                }
            });
        }
        section1(){
           // 메인 슬라이드 페이드인아웃 효과
           let cnt = -1; 
           let id  =  0;    
           
           // 1. 메인슬라이드함수
            function mainSlide(){                
                $('.slide').css({zIndex:1, opacity:1});
                $('.slide').eq(cnt+1).css({zIndex:2});
                $('.slide').eq(cnt).css({zIndex:3}).animate({opacity:0},1000);
            }
            
            // 다음카운트함수
            function nextCount(){
                cnt++; // 0 1 2
                if(cnt > 1){ // 2 정지
                    clearInterval(id); // 타이머정지
                }
                else{ // 0 1
                    mainSlide();                
                }                
            }

            // 3초 후에 슬라이드1 페이드아웃 되면서 실행            
            id = setInterval(nextCount, 3000);

        }
        section2(){

        }
        section3(){

        }
        section4(){

        }
        section5(){

        }
        section6(){

            // 폼 전송하기
            // $.ajax({});
            // 폼전송은 전송 버튼을 클릭하면 전송된다.
            $('#submit-btn').on({
                click(e){
                    //e.preventDefault();

                    const data =  {
                        "name":  $('#name').val(),
                        "email":  $('#email').val(),
                        "guests":   Number($('#guests').val()),
                        "event":   $('#event').val()
                    }

                    // Rest API
                    $.ajax({
                        url:'http://navhyun2023.dothome.co.kr/form_mail.php',
                        type:'POST',
                        data: data,  //문자열변경
                        success(result){
                            console.log( result );
                            $('#name').val('');
                            $('#email').val('');
                            $('#guests').val('01');
                            $('#event').val('ALL EVENTS');
                            $('#name').focus();

                        },
                        error(error){
                            console.log("ajax 실패");
                            console.log( error );
                        }
                    });

                }
            });

        }
        section7(){

        }
        section8(){
            
            // 3초 후에  우측에서 좌측으로 -25% 부드럽게 이동하는 애니메이션
            const slideContainer = $('.slide-container');
            const slideWrap = $('.slide-wrap');
            let cnt = 0;

            //setTimeout(function(){
               // slideWrap.animate({left: `${ -25 * cnt }%`},600);
            //},3000);



            // 메인 슬라이드 함수
            function mainSlide(){
                slideWrap.animate({left: `${ -25 * cnt }%`}, 600,  'easeInOutExpo');
            }




            // 다음 슬라이드  
            function nextSlide(){
                cnt++;
                if(cnt>1){cnt=1}
                mainSlide();
            }  

            // 이전 슬라이드    
            function prevSlide(){
                cnt--;
                if(cnt<0){cnt=0}
                mainSlide();
            }  



            // 터치 스와이프
            let touchStart = null; // 터치시작
            let touchEnd = null;   // 터치끝

            // 드래그 
            let mouseDown = false;  // 마우스 다운이 되면 드래그 시작 신호
            let dragStart = null;
            let dragEnd = null;

            slideContainer.on({
                mousedown(event){
                    mouseDown = true;
                    touchStart = event.clientX;
                    //console.log("touchStart 시작" + event.clientX  ); // 터치시작
                    dragStart = event.clientX - slideWrap.offset().left;
                },
                mouseup(event){
                    touchEnd = event.clientX;
                    //console.log("touchEnd 끝" +   event.clientX  ); // 터치 끝
                    if( touchStart - touchEnd > 0  ){
                        console.log( '다음슬라이드' );
                        nextSlide();
                    }

                    if( touchStart - touchEnd < 0  ){
                        console.log( '이전슬라이드' );
                        prevSlide();
                    }
                    mouseDown=false; 

                },
                mousemove(e){
                    if(mouseDown!==true) return;  // 다운이 되야만 드래그 한다.
                    console.log( e.clientX );

                    dragEnd = e.clientX;
                    // 마우스로 드래그 시작 ~ 끝  간격만 이동
                    console.log(  dragEnd - dragStart  );
                    slideWrap.css({ left: dragEnd - dragStart });
                }
            });

        }
        section9(){

        }
        section10(){

        }
        section11(){

        }
        footer(){

        }
        modal(){
            let num = 8; 

            // 10초 후에 1회 실행해서  모달창 띄우기
            // setTimeout(function(){
            //     $('.modal').fadeIn();
            //     setInterval(function(){ //3초 간격으로 계속 실행
            //         num++;                    
            //         if(num>15){num=8}   
            //         $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300);                 
            //     },3000);
            // },10000);




            // 모달창 닫기
            $('.modal-close-btn').on({
                click(e){
                    e.preventDefault();
                   $('.modal').stop().fadeOut(600);
                }
            });

            // 갤러리 이미지 클릭 
            // 모달창 열기 => 스크롤바를 숨김            
            $('.img-btn').on({
                click(e){
                    e.preventDefault();

                    console.log( new Date().getTime() );
                    console.log( new Date(1688035941663) );
                    console.log( new Date(1724032218783) );

                   // let img = $(this).attr('src'); // Attrubute 어트리뷰트 속성
                    //$('.modal img').prop('src', img); // 현재 클릭한 이미지 src 이미지를 넣어라
                   $('html').addClass('on');

                    num = $(this).data('idx');
                    $('.modal img').fadeOut(0).attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300); // 현재 클릭한 이미지 src 이미지를 넣어라
                    $('.modal').fadeIn();
                }
            });

            // 희색창 클릭 창닫기
            $('.modal .container').on({
                click(){
                    $('html').removeClass('on');
                    $('.modal').stop().fadeOut(300);
                }
            });

            // 모달창 이미지 클릭 이벤트
            // 부모박스까지의 클릭 이벤트 전파 차단하기
            $('.modal img').on({
                click(e){
                    e.stopPropagation(); // 전파 차단하기
                    num++; // 1씩 증가 num = num +1
                    if(num>15){num=8} // 마지막이미지는 처음으로 셋팅
                    $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300);
                }
            });

            // 다음 화살버튼
            $('.modal-next-btn').on({
                click(e){
                e.stopPropagation();
                num++; // 1씩 증가 num = num +1
                if(num>15){num=8} // 마지막이미지는 처음으로 셋팅
                $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300);
                }
            });

            // 이전 화살버튼
            $('.modal-prev-btn').on({
                click(e){
                e.stopPropagation();
                num--; // 1씩 감소 num = num +1
                if(num<8){num=15} // 마지막이미지는 처음으로 셋팅
                $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).stop().fadeOut(0).fadeIn(300); 
                }
            });
        }
    }
     const newWedding = new Wedding();
     newWedding.init();     


})(jQuery, window, document);