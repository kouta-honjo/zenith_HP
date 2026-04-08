	const hamburgerButton = document.querySelector('#js-buttonHamburger');
    const nav = document.querySelector(".p-header__nav");

    hamburgerButton.addEventListener('click', (e) => {
        const isExpanded = e.currentTarget.getAttribute("aria-expanded") !== "false";
        e.currentTarget.setAttribute("aria-expanded", !isExpanded);
        document.documentElement.classList.toggle("is-drawerActive");
        nav.classList.toggle("is-active");

        var body = document.body;
        var bodyStyle = window.getComputedStyle(body);
        if (bodyStyle.overflow === "hidden") {
            body.style.height = "";
            body.style.overflow = "";
        } else {
            body.style.height = "auto";
            body.style.overflow = "hidden";
        }
    });

    document.querySelectorAll('js-header__nav-link').forEach(item => {
        item.addEventListener('click', () => {
            document.documentElement.classList.remove("is-drawerActive");
            nav.classList.remove("is-active");
            hamburgerButton.setAttribute("aria-expanded", "false");
            var body = document.body;
            body.style.height = "";
            body.style.overflow = "";
        });
    });

    const navItems = document.querySelectorAll(".js-header__nav-list-link-btn");
    // ウィンドウの幅が768px以下の場合のみイベントリスナーを追加する
    if (window.innerWidth <= 768) {
        const navLink = document.querySelectorAll(".p-header__nav-list-link-parent");
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains("is-accordionActive");
                if (isActive) {
                    item.classList.remove("is-accordionActive");
                    navLink.forEach(el => el.classList.remove("is-accordionActive"));
                    return;
                }
                navItems.forEach(el => el.classList.remove("is-accordionActive"));
                navLink.forEach(el => el.classList.remove("is-accordionActive"));
                item.classList.add("is-accordionActive");
                const index = Array.from(navItems).indexOf(item);
                navLink[index].classList.add("is-accordionActive");
            });
        });
    }

    const modal = document.querySelector('.js-modal');
    const modalOpenBtns = document.querySelectorAll('.js-modal-open');
    const modalCloseBtn = document.querySelector('.js-modal-close');
    
    let swiper = null;
    
    // Swiperを初期化（スマホのときのみ）
    function initSwiperIfMobile() {
      const isMobile = window.innerWidth < 768;
    
      if (isMobile && !swiper) {
        swiper = new Swiper('.swiper-container', {
          loop: true,
          slidesPerView: 1,
          centeredSlides: false, 
          spaceBetween: 32,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          }
        });
      } else if (!isMobile && swiper) {
        swiper.destroy(true, true); // Swiperを破棄
        swiper = null;
      }
    }
    
    // モーダルを開く
    modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('is-active');
        initSwiperIfMobile(); // モーダルを開いたときにSwiperを初期化
      });
    });
    
    // モーダルを閉じる
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
    
    // モーダルの外側をクリックして閉じる
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-active');
      }
    });
    
    // 画面サイズが変わったらSwiperの状態を調整（念のため）
    window.addEventListener('resize', () => {
      if (modal.classList.contains('is-active')) {
        initSwiperIfMobile();
      }
    });


/*追記*/
/*
 const returnTop = document.querySelector('.entry-link');  

   window.addEventListener('scroll', () => {
	let scrollY = window.scrollY;
	if(scrollY >= 150) {
		//classにactive付与
		returnTop.classList.add('active');
	}
	else {
		//classからactive削除
		returnTop.classList.remove('active');
	}
   });
*/


$(function() {

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $(".entry-link").fadeIn(300);
            } else {
            $(".entry-link").fadeOut(300);
        }

        const scrollHeight = $(document).height();/*ページ全体の高さ*/
        const scrollPosition = $(window).height() + $(window).scrollTop();/*ページの一番上からスクロールされた距離*/
        const footHeight = $(".p-footer").height();/*フッターの高さ*/

        if ( scrollHeight - scrollPosition  <= footHeight ) {
            $('.entry-link').removeClass('active');
        } else {
            $('.entry-link').addClass('active');
        }
    });

});
