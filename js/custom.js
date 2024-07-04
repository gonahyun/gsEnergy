$(function () {
  // 페이지 이동 방지
  window.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  let $html = $("html");
  let page = 1;
  let lastPage = $(".content").length;

  $html.animate({ scrollTop: 0 }, 10);

  $(window).on("wheel", function (e) {
    if ($html.is(":animated")) return;

    if (e.originalEvent.deltaY > 0) {
      if (page == lastPage) return;
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page == 1) return;
      page--;
    }
    var posTop = (page - 1) * $(window).height();

    $html.animate({ scrollTop: posTop });
  });

  // 각 섹션의 위치 계산
  let baseline = -200;
  let sec1 = $("#sec1").offset().top + baseline;
  let sec2 = $("#sec2").offset().top + baseline;
  let sec3 = $("#sec3").offset().top + baseline;
  let sec4 = $("#sec4").offset().top + baseline;
  let sec5 = $("#sec5").offset().top + baseline;

  console.log("sec1", sec1);
  console.log("sec2", sec2);
  console.log("sec3", sec3);
  console.log("sec4", sec4);
  console.log("sec5", sec5);

  // 언어 선택 버튼 클릭 이벤트 처리
  $("header .hRight .lang button").click(function () {
    $(this).toggleClass("show");
    $("header .hRight .lang ul").slideToggle(200);
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest("header .hRight .lang").length) {
      $("header .hRight .lang ul").slideUp(200);
      $("header .hRight .lang button").removeClass("show");
    }
  });

  // 슬라이드 관련 변수 초기화
  let current = 0;
  let sliderInterval;
  const sliders = $(".slider");

  // 초기 슬라이드 설정 및 애니메이션 추가
  sliders.hide().first().show().addClass("slick-active");
  $(".slider.slick-active .sT h2").addClass("show2");
  $(".slider.slick-active .sT p").addClass("show2");
  $(".slick-dots li").first().addClass("slick-active");

  // 슬라이드 전환 함수
  function showSlide(index) {
    const currentSlide = sliders.eq(current);
    const nextSlide = sliders.eq(index);

    // 현재 슬라이드의 텍스트 애니메이션 제거
    currentSlide.find(".sT h2").removeClass("show2");
    currentSlide.find(".sT p").removeClass("show2");

    // 다음 슬라이드를 미리 페이드인하고, z-index를 조정하여 표시
    nextSlide.css({ zIndex: 2 }).fadeIn(1200, function () {
      $(this).addClass("slick-active");
      $(this).find(".sT h2").addClass("show2");
      $(this).find(".sT p").addClass("show2");
    });

    // 현재 슬라이드를 페이드아웃하고, z-index를 조정하여 숨김
    currentSlide.css({ zIndex: 1 }).fadeOut(1200, function () {
      $(this).removeClass("slick-active");
      $(this).hide();
    });

    // 슬라이드 도트 상태 업데이트
    $(".slick-dots li")
      .removeClass("slick-active")
      .eq(index)
      .addClass("slick-active");

    current = index;
  }

  // 자동 슬라이드 전환 설정
  sliderInterval = setInterval(function () {
    let next = (current + 1) % sliders.length;
    showSlide(next);
  }, 5000);

  // 슬라이드 도트 클릭 이벤트
  $(".slick-dots li").on("click", function () {
    let index = $(this).index();
    clearInterval(sliderInterval);
    showSlide(index);

    // 클릭 후 자동 슬라이드 재개
    sliderInterval = setInterval(function () {
      let next = (current + 1) % sliders.length;
      showSlide(next);
    }, 5000);
  });

  // 스크롤 이벤트 처리
  $(window).on("scroll", function () {
    let scroll = $(this).scrollTop();

    // sec1 범위 처리
    if (scroll >= sec1 && scroll < sec2) {
      $("#slide .slideWrap .slider .sT h2").addClass("show2");
      $("#slide .slideWrap .slider .sT p ").addClass("show2");
    } else {
      $("#slide .slideWrap .slider .sT h2").removeClass("show2");
      $("#slide .slideWrap .slider .sT p ").removeClass("show2");
    }

    // sec2 범위 처리
    if (scroll >= sec2 && scroll < sec3) {
      $("#sec2 .title-box").addClass("fadeDown");
      $("#sec2 .sec2Content li").addClass("fadeInUp");

      // rolling
      let roll = document.querySelector(".roll");
      let rolling = document.querySelector(".rolling");

      let clone = rolling.cloneNode(true);
      rolling.setAttribute("id", "rolling1");
      clone.setAttribute("id", "rolling2");

      roll.appendChild(clone);
    } else {
      $("#sec2 .title-box").removeClass("fadeDown");
      $("#sec2 .sec2Content li").removeClass("fadeInUp");
    }

    // sec3 범위 처리
    if (scroll >= sec3 && scroll < sec4) {
      $("header").css("border-bottom", "1px solid rgba(85, 85, 85, 0.2)");
      $("header .hRight .nav ul > li > a ").css("color", "#555");
      $("header .hRight .lang button").css("color", "#555");
      $(".logo img").attr("src", "img/logoG.png");

      $(
        "header .hRight .lang button::before, header .hRight .lang button::after"
      ).css({
        content: "url(/img/lang_icon_scroll1.svg)",
        opacity: "0",
      });

      $("#sec3 .title-box").addClass("fadeDown");
      $(".tbl_value .v1 ul ").css("opacity", "1");
      $(".tbl_value .v1 .c1").addClass("moveLeft");
      $(".tbl_value .v1 .c3").addClass("moveRight");
      $(".tbl_value .v1, .tbl_value .v2 ").css("opacity", "1");
      $(".v2 dd").addClass("fadeInUp");
    } else {
      $("header").css("border-bottom", "1px solid rgba(255, 255, 255, 0.2)");
      $("header .hRight .nav ul > li > a ").css("color", "#fff");
      $("header .hRight .lang button").css("color", "#fff");
      $(".logo img").attr("src", "img/logoW.png");

      $(
        "header .hRight .lang button::before, header .hRight .lang button::after"
      ).css({
        content: "url(/img/lang_icon_scroll1.svg)",
        opacity: "0",
      });

      $("#sec3 .title-box").removeClass("fadeDown");
      $(".tbl_value .v1 ul ").css("opacity", "0");
      $(".tbl_value .v1 .c1").removeClass("moveLeft");
      $(".tbl_value .v1 .c3").removeClass("moveRight");
      $(".tbl_value .v1, .tbl_value .v2 ").css("opacity", "0");
      $(".v2 dd").removeClass("fadeInUp");
    }

    // sec4 범위 처리
    if (scroll >= sec4 && scroll < sec5) {
      $("#sec4 .title-box").addClass("fadeDown");
      $("#sec4 .line, #sec4 .line2").css("transform", "scaleY(1)");
      $("#sec4 .icon-list ul").addClass("fadeInUp");
    } else {
      $("#sec4 .title-box").removeClass("fadeDown");
      $("#sec4 .line, #sec4 .line2").css("transform", "scaleY(0)");
      $("#sec4 .icon-list ul").removeClass("fadeInUp");
    }

    // sec5 범위 처리
    if (scroll >= sec5) {
      $("header").css("border-bottom", "1px solid rgba(85, 85, 85, 0.2)");
      $("header .hRight .nav ul > li > a ").css("color", "#555");
      $("header .hRight .lang button").css("color", "#555");
      $(".logo img").attr("src", "img/logoG.png");

      $("header .hRight .lang button::after").css({
        content: "url(/img/lang_icon_scroll1.svg)",
        opacity: "0",
      });

      $("#sec5 .sec5Wrap .s5C ul li:nth-child(1)").addClass(
        "animate-slideFromLeft"
      );
      $("#sec5 .sec5Wrap .s5C ul li:nth-child(2)").addClass(
        "animate-slideFromRight"
      );
    } else {
      $("#sec5 .sec5Wrap .s5C ul li:nth-child(1)").removeClass(
        "animate-slideFromLeft"
      );
      $("#sec5 .sec5Wrap .s5C ul li:nth-child(2)").removeClass(
        "animate-slideFromRight"
      );
    }
  });
});
