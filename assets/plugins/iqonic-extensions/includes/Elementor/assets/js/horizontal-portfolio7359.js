(function ($) {
    "use strict";
    $(window).ready(function () {
        /* Portfolio */
        if ($(window).width() > 1024) {
            horizontalPortfolio();
        }

    });
    $(window).on("resize", function () {
        if ($(window).width() > 1024) {
            horizontalPortfolio();
        }
    });
})(jQuery);

function horizontalPortfolio() {
    if (document.getElementsByClassName('css_prefix-portfolio-horizontal').length > 0) {

        const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
        const clamp = (val, min, max) => Math.max(min, Math.min(val, max));
        class DragScroll {
            constructor(obj) {
                this.$el = document.querySelector(obj.el);
                this.$wrap = this.$el.querySelector(obj.wrap);
                this.$items = this.$el.querySelectorAll(obj.item);
                this.init();
            }

            init() {
                this.progress = 0;
                this.speed = 0;
                this.oldX = 0;
                this.x = 0;
                this.playrate = 0;
                //
                this.bindings();
                this.events();
                this.calculate();
                this.raf();
                this.calculateWidth();
            }

            bindings() {
                [
                    'events',
                    'calculate',
                    'handleWheel',
                    'move',
                    'raf',
                    'handleTouchStart',
                    'handleTouchMove',
                    'handleTouchEnd'
                ].forEach(i => {
                    this[i] = this[i].bind(this);
                });
            }

            calculate() {
                this.progress = 0;
                this.firstSlideWidth = this.$items[0].clientWidth;
                this.allSlideWidth = this.$items[1].clientWidth * (this.$items.length - 1);
                this.wrapWidth = this.allSlideWidth + this.firstSlideWidth + parseInt(this.$el.getBoundingClientRect().left);
                this.$wrap.style.width = `${this.wrapWidth}px`;
                this.maxScroll = this.wrapWidth - this.$el.clientWidth;
            }

            handleWheel(e) {
                if (this.calculateWidth() > 1024) {
                    this.progress += e.deltaY;
                    this.move();
                }
            }

            handleTouchStart(e) {
                e.preventDefault();
                if (this.calculateWidth() > 1024) {

                    this.dragging = true;
                    this.startX = e.clientX || e.touches[0].clientX;
                    this.$el.classList.add('dragging');
                }
            }

            handleTouchMove(e) {
                if (this.calculateWidth() > 1024) {
                    if (!this.dragging) return false;
                    const x = e.clientX || e.touches[0].clientX;
                    this.progress += (this.startX - x) * 2.5;
                    this.startX = x;
                    this.move();
                }
            }

            handleTouchEnd() {
                if (this.calculateWidth() > 1024) {
                    this.dragging = false;
                    this.$el.classList.remove('dragging');
                }
            }

            move() {
                if (this.calculateWidth() > 1024) {
                    this.$items.forEach(function (e) {
                        if (e.getBoundingClientRect().left < 500) {
                            e.classList.add("active-item");
                        }
                    });

                    this.progress = clamp(this.progress, 0, this.maxScroll);
                }
            }
            calculateWidth() {
                return jQuery(window).width();
            }
            events() {
                window.addEventListener('resize', this.calculate);
                window.addEventListener('resize', this.calculateWidth);
                window.addEventListener('wheel', this.handleWheel);
                //
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                window.addEventListener('touchmove', this.handleTouchMove);
                window.addEventListener('touchend', this.handleTouchEnd);
                //
                window.addEventListener('mousedown', this.handleTouchStart);
                window.addEventListener('mousemove', this.handleTouchMove);
                window.addEventListener('mouseup', this.handleTouchEnd);
                document.body.addEventListener('mouseleave', this.handleTouchEnd);
            }

            raf() {

                requestAnimationFrame(this.raf)
                this.x = lerp(this.x, this.progress, 0.1);
                this.playrate = this.x / this.maxScroll;
                this.$wrap.style.transform = `translateX(${-this.x}px)`;
                this.speed = Math.min(100, this.oldX - this.x);
                this.oldX = this.x;
                this.scale = lerp(this.scale, this.speed, 0.1);
                if (document.getElementsByClassName('css_prefix-portfolio-horizontal-transition').length > 0) {
                    this.$items.forEach(i => {
                        if (!i.classList.contains('h-title-text')) {
                            i.querySelector('.back-feature-img .featured-img').style.transform = `translateX(${10 + Math.abs(this.speed) * 1}px)`;
                        }
                    });

                }
            }
        }

        /*--------------------
        Instances
        --------------------*/
        const scroll = new DragScroll({
            el: '.css_prefix-portfolio-horizontal',
            wrap: '.portfolio-horizontal-inner',
            item: '.gallery-item',
        });


    }
}