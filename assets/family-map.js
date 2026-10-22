// Zoomable present-day map of the Krasnoe area on the family history page.
(function () {
  var el = document.getElementById('today-map');
  if (!el || !window.L) return;
  var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2f6b4f';
  var map = L.map(el, { scrollWheelZoom: false, dragging: !L.Browser.mobile });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  // Locations from OpenStreetMap (Nominatim), checked 21 October 2026.
  var places = [
    ['Krasnoe', 54.24910, 27.07830, true, 'left'],
    ['Mozolei', 54.25610, 27.15167, true, 'top'],
    ['Ivontsevichi', 54.21727, 27.06576, true, 'left'],
    ['Granich', 54.22562, 27.18136, true, 'right'],
    ['Molodechno', 54.30733, 26.83891, false, 'right'],
    ['Radoshkovichi', 54.15969, 27.23552, false, 'right']
  ];
  var offsets = { left: [-8, 0], right: [8, 0], top: [0, -8] };
  var narrow = el.clientWidth < 600;
  var bounds = [];
  places.forEach(function (p) {
    L.circleMarker([p[1], p[2]], {
      radius: p[3] ? 7 : 5, color: '#fff', weight: 2,
      fillColor: p[3] ? accent : '#555', fillOpacity: 1
    }).addTo(map).bindTooltip(p[0], { permanent: true, direction: p[4], offset: offsets[p[4]], className: 'map-tip' });
    // On narrow screens, frame only the family villages so labels don't collide.
    if (p[3] || !narrow) bounds.push([p[1], p[2]]);
  });
  map.fitBounds(bounds, { paddingTopLeft: [100, 40], paddingBottomRight: [90, 30] });
})();
