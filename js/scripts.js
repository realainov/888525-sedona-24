var ua = window.navigator.userAgent.toLowerCase(), is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);

if (document.querySelector(".search__title") !== null) {
  var searchButton = document.querySelector(".search__title");
  var searchModal = document.querySelector(".search-form");
  searchModal.classList.add("search-form--close");

  searchButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    searchModal.classList.toggle("search-form--show");
  });

  var adultsLabel = searchModal.querySelector(".search-form__adults");
  var adultsMinus = adultsLabel.querySelector(".search-form__prev-button");
  var adultsPlus = adultsLabel.querySelector(".search-form__next-button");
  var adultsInput = adultsLabel.querySelector("#adults-number-field");

  adultsMinus.classList.add("search-form__prev-button--show");
  adultsPlus.classList.add("search-form__next-button--show");
  adultsMinus.style.cursor = "pointer";
  adultsPlus.style.cursor = "pointer";

  adultsMinus.addEventListener("click", function (evt) {
    evt.preventDefault();
    var adultsValue = adultsInput.value;
    if (adultsValue > 0) {
      adultsInput.value = adultsValue - 1;
    }
  });

  adultsPlus.addEventListener("click", function (evt) {
    evt.preventDefault();
    var adultsValue = adultsInput.value;
    adultsInput.value = +adultsValue + 1;
  });

  var kidsLabel = searchModal.querySelector(".search-form__kids");
  var kidsMinus = kidsLabel.querySelector(".search-form__prev-button");
  var kidsPlus = kidsLabel.querySelector(".search-form__next-button");
  var kidsInput = kidsLabel.querySelector("#kids-number-field");

  kidsMinus.classList.add("search-form__prev-button--show");
  kidsPlus.classList.add("search-form__next-button--show");
  kidsMinus.style.cursor = "pointer";
  kidsPlus.style.cursor = "pointer";

  kidsMinus.addEventListener("click", function (evt) {
    evt.preventDefault();
    var kidsValue = kidsInput.value;
    if (kidsValue > 0) {
      kidsInput.value = kidsValue - 1;
    }
  });

  kidsPlus.addEventListener("click", function (evt) {
    evt.preventDefault();
    var kidsValue = kidsInput.value;
    kidsInput.value = +kidsValue + 1;
  });
}

if (document.querySelector(".sorting-form__range-filter") !== null) {
  var scale = document.querySelector(".sorting-form__scale");
  var bar = document.querySelector(".sorting-form__bar");

  var minToggle = document.querySelector(".sorting-form__toggle--min");
  var maxToggle = document.querySelector(".sorting-form__toggle--max");

  var minResult = document.querySelector("[name=min-price]");
  var maxResult = document.querySelector("[name=max-price]");

  var scaleClientCoords = scale.getBoundingClientRect();
  var scaleCoords = {};
  scaleCoords.left = scaleClientCoords.left + pageXOffset;

  var rightLimit = scale.offsetWidth - minToggle.offsetWidth;

  minToggle.onmousedown = function (e) {

    minToggle.ondragstart = function () {
      return false;
    };

    var minToggleClientCoords = minToggle.getBoundingClientRect();
    var minToggleCoords = {};
    minToggleCoords.left = minToggleClientCoords.left + pageXOffset;

    document.onmousemove = function (e) {

      var newMinLeft = e.pageX - scaleCoords.left;

      if (newMinLeft < 0) {
        newMinLeft = 0;
      }

      if (newMinLeft > (maxResult.value / 10000 * rightLimit - minToggle.offsetWidth)) {
        newMinLeft = maxResult.value / 10000 * rightLimit - minToggle.offsetWidth;
      }

      minToggle.style.left = newMinLeft + "px";
      bar.style.left = newMinLeft + "px";
      bar.style.width = (maxResult.value / 10000 * rightLimit) - newMinLeft + "px";

      minResult.value = Math.round((newMinLeft / rightLimit) * 10000);
      return false;
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    }

  };

  maxToggle.onmousedown = function (e) {

    maxToggle.ondragstart = function () {
      return false;
    };

    var maxToggleClientCoords = maxToggle.getBoundingClientRect();
    var maxToggleCoords = {};
    maxToggleCoords.left = maxToggleClientCoords.left + pageXOffset;

    document.onmousemove = function (e) {

      var newMaxLeft = e.pageX - scaleCoords.left;

      if (newMaxLeft < (minResult.value / 10000 * rightLimit + maxToggle.offsetWidth)) {
        newMaxLeft = minResult.value / 10000 * rightLimit + maxToggle.offsetWidth;
      }

      if (newMaxLeft > rightLimit) {
        newMaxLeft = rightLimit;
      }

      maxToggle.style.left = newMaxLeft + "px";
      bar.style.right = newMaxLeft - bar.offsetWidth + "px";
      bar.style.width = newMaxLeft - (minResult.value / 10000 * rightLimit) + "px";

      maxResult.value = Math.round((newMaxLeft / rightLimit) * 10000);
      return false;
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    }

  };

  minResult.onchange = function () {
    if (minResult.value < 0) minResult.value = 0;
    if (minResult.value > (maxResult.value - 1143)) minResult.value = maxResult.value - 1143;

    minToggle.style.left = minResult.value / 10000 * rightLimit + "px";
    bar.style.left = minResult.value / 10000 * rightLimit + "px";
    bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + "px";
  };

  maxResult.onchange = function () {
    if (maxResult.value < (+minResult.value + 1143)) maxResult.value = +minResult.value + 1143;
    if (maxResult.value > 10000) maxResult.value = 10000;

    maxToggle.style.left = maxResult.value / 10000 * rightLimit + "px";
    bar.style.left = minResult.value / 10000 * rightLimit + "px";
    bar.style.width = (maxResult.value / 10000 * rightLimit) - (minResult.value / 10000 * rightLimit) + "px";
  };
}

if (document.querySelector(".search__map") !== null) {
  var map;

  function initMap() {

    map = new google.maps.Map(document.querySelector(".search__map"), {
      center: {lat: 34.769340, lng: -111.761224},
      zoom: 9,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_TOP
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    });

    var marker = new google.maps.Marker({
      position: {lat: 34.869340, lng: -111.761224},
      map: map,
      title: "Седона"
    });
  }
}

if (is_ie) {
  var welcome = document.querySelector(".site-main__welcome");
  welcome.style.backgroundPosition = "center 225px, center -85px";
}
