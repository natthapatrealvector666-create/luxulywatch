/* ===============================================
  OPEN CLOSE Menu
============================================= */

function luxury_watch_store_open_menu() {
  jQuery('button.menu-toggle').addClass('close-panal');
  setTimeout(function(){
    jQuery('nav#main-menu').show();
  }, 100);

  return false;
}
jQuery( "button.menu-toggle").on("click", luxury_watch_store_open_menu);

function luxury_watch_store_close_menu() {
  jQuery('button.close-menu').removeClass('close-panal');
  jQuery('nav#main-menu').hide();
}

jQuery( "button.close-menu").on("click", luxury_watch_store_close_menu);
function luxury_watch_store_search_show() {
	jQuery(".outer-search").addClass('show');
	jQuery(".outer-search").fadeIn();
}
jQuery( ".search-cont-button").on("click", luxury_watch_store_search_show);

function luxury_watch_store_search_hide() {
	jQuery(".outer-search").removeClass('show');
	jQuery(".outer-search").fadeOut();
}
jQuery( ".search-cont-button-close").on("click", luxury_watch_store_search_hide);
/* ===============================================
  TRAP TAB FOCUS ON MODAL MENU
============================================= */

jQuery('button.close-menu').on('keydown', function (e) {
  if (jQuery("this:focus") && !!e.shiftKey && e.keyCode === 9) {
  } else if (jQuery("this:focus") && (e.which === 9)) {
    e.preventDefault();
    jQuery(this).blur();
    jQuery('.menu li a:first').focus()
  }
});

jQuery('.menu li a:first').on('keydown', function (event) {
  if (jQuery("this:focus") && !!event.shiftKey && event.keyCode === 9) {
    event.preventDefault();
    jQuery(this).blur();
    jQuery('button.close-menu').focus()
  }
});

jQuery('#main-menu ul:first li:first a').on('keydown', function (event) {
  if (event.shiftKey && event.keyCode == 9) {
    event.preventDefault();
    jQuery(this).blur();
    jQuery('button.close-menu').focus();
  }
})

jQuery(document).ready(function() {
  window.addEventListener('load', (event) => {
      jQuery(".loader").delay(2000).fadeOut("slow");
  });
})

/* ===============================================
  Scroll Top //
============================================= */

jQuery(window).scroll(function () {
  if (jQuery(this).scrollTop() > 100) {
      jQuery('.scroll-up').fadeIn();
  } else {
      jQuery('.scroll-up').fadeOut();
  }
});

jQuery('a[href="#tobottom"]').click(function () {
  jQuery('html, body').animate({scrollTop: 0}, 'slow');
  return false;
});

/* ===============================================
  Search pop up
============================================= */

jQuery('.search-cont-button-close').on('keydown', function (es) {
  if (jQuery("this:focus") && (es.which === 9)) {
    es.preventDefault();
    jQuery(this).blur();
    jQuery('.inner-search form input').focus();
  }
});

jQuery('.inner-search form input').on('keydown', function (eventser) {
  if (eventser.shiftKey && eventser.keyCode == 9) {
    eventser.preventDefault();
    jQuery(this).blur();
    jQuery('.search-cont-button-close').focus()
  }
});

/* ===============================================
  Custom Cursor
============================================= */

const luxury_watch_store_customCursor = {
  init: function () {
    this.luxury_watch_store_customCursor();
  },
  isVariableDefined: function (el) {
    return typeof el !== "undefined" && el !== null;
  },
  select: function (selectors) {
    return document.querySelector(selectors);
  },
  selectAll: function (selectors) {
    return document.querySelectorAll(selectors);
  },
  luxury_watch_store_customCursor: function () {
    const luxury_watch_store_cursorDot = this.select(".cursor-point");
    const luxury_watch_store_cursorOutline = this.select(".cursor-point-outline");
    if (this.isVariableDefined(luxury_watch_store_cursorDot) && this.isVariableDefined(luxury_watch_store_cursorOutline)) {
      const cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: window.innerWidth / 2,
        endY: window.innerHeight / 2,
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: luxury_watch_store_cursorDot,
        $outline: luxury_watch_store_cursorOutline,

        init: function () {
          this.dotSize = this.$dot.offsetWidth;
          this.outlineSize = this.$outline.offsetWidth;
          this.setupEventListeners();
          this.animateDotOutline();
        },

        updateCursor: function (e) {
          this.cursorVisible = true;
          this.toggleCursorVisibility();
          this.endX = e.clientX;
          this.endY = e.clientY;
          this.$dot.style.top = `${this.endY}px`;
          this.$dot.style.left = `${this.endX}px`;
        },

        setupEventListeners: function () {
          window.addEventListener("load", () => {
            this.cursorEnlarged = false;
            this.toggleCursorSize();
          });

          luxury_watch_store_customCursor.selectAll("a, button").forEach((el) => {
            el.addEventListener("mouseover", () => {
              this.cursorEnlarged = true;
              this.toggleCursorSize();
            });
            el.addEventListener("mouseout", () => {
              this.cursorEnlarged = false;
              this.toggleCursorSize();
            });
          });

          document.addEventListener("mousedown", () => {
            this.cursorEnlarged = true;
            this.toggleCursorSize();
          });
          document.addEventListener("mouseup", () => {
            this.cursorEnlarged = false;
            this.toggleCursorSize();
          });

          document.addEventListener("mousemove", (e) => {
            this.updateCursor(e);
          });

          document.addEventListener("mouseenter", () => {
            this.cursorVisible = true;
            this.toggleCursorVisibility();
            this.$dot.style.opacity = 1;
            this.$outline.style.opacity = 1;
          });

          document.addEventListener("mouseleave", () => {
            this.cursorVisible = false;
            this.toggleCursorVisibility();
            this.$dot.style.opacity = 0;
            this.$outline.style.opacity = 0;
          });
        },

        animateDotOutline: function () {
          this._x += (this.endX - this._x) / this.delay;
          this._y += (this.endY - this._y) / this.delay;
          this.$outline.style.top = `${this._y}px`;
          this.$outline.style.left = `${this._x}px`;

          requestAnimationFrame(this.animateDotOutline.bind(this));
        },

        toggleCursorSize: function () {
          if (this.cursorEnlarged) {
            this.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
            this.$outline.style.transform = "translate(-50%, -50%) scale(1.6)";
          } else {
            this.$dot.style.transform = "translate(-50%, -50%) scale(1)";
            this.$outline.style.transform = "translate(-50%, -50%) scale(1)";
          }
        },

        toggleCursorVisibility: function () {
          if (this.cursorVisible) {
            this.$dot.style.opacity = 1;
            this.$outline.style.opacity = 1;
          } else {
            this.$dot.style.opacity = 0;
            this.$outline.style.opacity = 0;
          }
        },
      };
      cursor.init();
    }
  },
};
luxury_watch_store_customCursor.init();

/* ===============================================
  Progress Bar
============================================= */
const luxury_watch_store_progressBar = {
  init: function () {
      let luxury_watch_store_progressBarDiv = document.getElementById("elemento-progress-bar");

      if (luxury_watch_store_progressBarDiv) {
          let luxury_watch_store_body = document.body;
          let luxury_watch_store_rootElement = document.documentElement;

          window.addEventListener("scroll", function (event) {
              let luxury_watch_store_winScroll = luxury_watch_store_body.scrollTop || luxury_watch_store_rootElement.scrollTop;
              let luxury_watch_store_height =
              luxury_watch_store_rootElement.scrollHeight - luxury_watch_store_rootElement.clientHeight;
              let luxury_watch_store_scrolled = (luxury_watch_store_winScroll / luxury_watch_store_height) * 100;
              luxury_watch_store_progressBarDiv.style.width = luxury_watch_store_scrolled + "%";
          });
      }
  },
};
luxury_watch_store_progressBar.init();

/* ===============================================
   sticky copyright
============================================= */

window.addEventListener('scroll', function() {
  var luxury_watch_store_footer = document.querySelector('.sticky-copyright');
  if (!luxury_watch_store_footer) return; 

  var luxury_watch_store_scrollTop = window.scrollY || document.documentElement.luxury_watch_store_scrollTop;

  if (luxury_watch_store_scrollTop >= 100) {
    luxury_watch_store_footer.classList.add('active-sticky');
  }
});

/* ===============================================
   sticky sidebar
============================================= */

window.addEventListener('scroll', function () {
  var luxury_watch_store_sidebar = document.querySelector('.sidebar-sticky');
  if (!luxury_watch_store_sidebar) return;

  var luxury_watch_store_scrollTop = window.scrollY || document.documentElement.scrollTop;
  var luxury_watch_store_windowHeight = window.innerHeight;
  var luxury_watch_store_documentHeight = document.documentElement.scrollHeight;

  var luxury_watch_store_isBottom = luxury_watch_store_scrollTop + luxury_watch_store_windowHeight >= luxury_watch_store_documentHeight - 100;

  if (luxury_watch_store_scrollTop >= 100 && !luxury_watch_store_isBottom) {
    luxury_watch_store_sidebar.classList.add('sidebar-fixed');
  } else {
    luxury_watch_store_sidebar.classList.remove('sidebar-fixed');
  }
});