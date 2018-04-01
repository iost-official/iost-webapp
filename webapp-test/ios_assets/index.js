new Vue({
  el: '.index-app',
  data: {
    startTimer : 0,
    lastTimer : 0,
    blocks : [
      {
        x0 : 0,
        y0 : 3 / 7,
        x1 : 1 / 7,
        y1 : 4 / 7
      },
      {
        x0 : 0,
        y0 : 0,
        x1 : 1 / 7,
        y1 : 1 / 7
      },
      {
        x0 : 3 / 7,
        y0 : 0,
        x1 : 4 / 7,
        y1 : 1 / 7
      },
      {
        x0 : 5 / 14,
        y0 : 7 / 22,
        x1 : 9 / 14,
        y1 : 10 / 22
      },
      {
        x0 : 5 / 14,
        y0 : 12 / 22,
        x1 : 9 / 14,
        y1 : 15 / 22
      },
      {
        x0 : 3 / 7,
        y0 : 6 / 7,
        x1 : 4 / 7,
        y1 : 1
      },
      {
        x0 : 6 / 7,
        y0 : 6 / 7,
        x1 : 1,
        y1 : 1
      },
      {
        x0 : 6 / 7,
        y0 : 3 / 7,
        x1 : 1,
        y1 : 4 / 7
      }
    ],
    logoSeq : [
      [0, 4 / 7],
      [0, 0],
      [4 / 7, 0],
      [4 / 7, 7 / 22],
      [9 / 14, 7 / 22],
      [9 / 14, 10 / 22],
      [4 / 7, 10 / 22],
      [4 / 7, 12 / 22],
      [9 / 14, 12 / 22],
      [9 / 14, 15 / 22],
      [4 / 7, 15 / 22],
      [4 / 7, 6 / 7],
      [6 / 7, 6 / 7],
      [6 / 7, 2 / 7],
      [1, 3 / 7],
      [1, 1],
      [3 / 7, 1],
      [3 / 7, 15 / 22],
      [5 / 14, 15 / 22],
      [5 / 14, 12 / 22],
      [3 / 7, 12 / 22],
      [3 / 7, 10 / 22],
      [5 / 14, 10 / 22],
      [5 / 14, 7 / 22],
      [3 / 7, 7 / 22],
      [3 / 7, 1 / 7],
      [1 / 7, 1 / 7],
      [1 / 7, 4 / 7],
      [0, 4 / 7],
    ],
    logoSeqStr : '',

    vertices : [],
    edges : [],
    computedVertices : [],
    highlightedEdges : [],
    trans : [],
    computedTrans : [],
    timer : null,

    mouseX : null,
    mouseY : null,

    backgroundTimer : null,
    backgroundLines : [],
    backgroundLogo : '',

    cells : [],
    path : [],
    lastBgTime : 0,

    scrollPosition : 0,

    pageNames : ['main-page', 'intro-page', 'team-page', 'partner-page', 'subscribe-page'],
    pageHeight : [],
    curPage : 0,
    pagePosition : 0,
    windowWidth : 0,
    windowHeight : 0,
    totalHeight : '100vh'
  },
  computed: {
  },
  mounted: function() {
    this.startTimer = Date.now();
    this.lastTimer = Date.now();
    for (var i = 0; i < 8; i ++) {
      this.vertices.push([]);
    }
    this.updateVertices();
    this.getLogoSeq();
    this.timer = setInterval(this.updateVertices, 50);
    this.backgroundTimer = setInterval(this.updateBackground, 50);
    window.addEventListener('mousemove',this.mouseMove);

    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll: function() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.scrollPosition = window.scrollY / this.windowHeight;
      /*
      for (var i = 0; i < this.pageNames.length - 1; i ++) {
        if (window.scrollY <= $('.' + this.pageNames[i + 1]).offset().top - this.windowHeight * 0.2) {
          this.curPage = i;
          break;
        }
      }*/
      /*
      var wh = window.innerHeight;
      var gap = 0 * wh;
      var totalHeight = 0;
      for (var i = 0; i < this.pageNames.length; i ++) {
        if (totalHeight > 0) {
          totalHeight += gap;
        }
        var height = $('.' + this.pageNames[i]).outerHeight();
        if (height < wh) {
          //height = wh;
        }
        this.pageHeight[i] = height;
        totalHeight += height;
      }
      this.totalHeight = totalHeight + 'px';
      this.scrollPosition = 0;
      var i = 0;
      var t = window.scrollY;
      while (t >= this.pageHeight[i]) {
        this.scrollPosition += 1;
        t -= this.pageHeight[i] + gap;
        i ++;
      }
      this.curPage = this.scrollPosition;
      if (t > this.pageHeight[i] - wh) {
        this.scrollPosition += (t - this.pageHeight[i] + wh) / wh;
      }
      this.pagePosition = t + gap;
      if (this.pagePosition > this.pageHeight[i] - wh) {
        this.pagePosition = this.pageHeight[i] - wh;
      }
      console.log(this.scrollPosition);
      */
    },
    toPage: function(page) {
      pos = $('.' + this.pageNames[page]).offset().top;
      $('html,body').animate(
        {scrollTop: pos - 48},
        'fast'
      );
    },
    getLogoSeq: function() {
      var result = [];
      var sin45 = Math.sqrt(2) / 2;
      var sin60 = Math.sin(Math.PI / 3 * 2);

      maxY = 0;
      for (var i = 0; i <this.logoSeq.length; i ++) {
        this.logoSeq[i][0] -= 0.5;
        this.logoSeq[i][1] -= 0.5;
        var vertex = [
          this.logoSeq[i][1] * sin45 - this.logoSeq[i][0] * sin45,
          (this.logoSeq[i][1] * sin45 + this.logoSeq[i][0] * sin45) / 2
        ];

        if (vertex[1] > maxY) {
          maxY = vertex[1];
        }
        result.push(vertex);
      }
      for (var i = 0; i < this.logoSeq.length; i ++) {
        result[i][0] /= maxY;
        result[i][1] /= maxY;
        result[i][0] = result[i][0].toFixed(3);
        result[i][1] = result[i][1].toFixed(3);
      }
      this.logoSeq = result;
    },
    getLogo: function(x, y, r) {
      var result = []
      for (var i = 0; i < this.logoSeq.length; i ++) {
        result.push([
          this.logoSeq[i][0] * r + x,
          this.logoSeq[i][1] * r + y
        ]);
      }
      return result.join(' ');
    },
    updateBackground2: function() {
      var curTime = Date.now();
      var width = window.innerWidth;
      var height = window.innerHeight;
      var dir = [
        [0, 1],
        [1, 1],
        [1, 0],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [0, 1],
        [1, 1],
        [1, 0],
        [-1, 0],
        [-1, -1],
        [0, -1],
      ];
      var radius = 50;
      var yStep = radius * 1.5;
      var xStep = radius * Math.sin(Math.PI / 3) * 2;
      var n = Math.floor(height / yStep + 3);
      var m = Math.floor(width / xStep * 2);
      var sin60 = Math.sin(Math.PI / 3);
      var cos60 = Math.cos(Math.PI / 3);
      var result = [];
      for (var i = 0; i < n; i ++) {
        for (var j = 0; j < m; j ++) {
          var y = i * yStep - radius - this.mouseY / 400;
          var x = j * xStep - radius - this.mouseX / 400;
          x -= xStep / 2 * i;
          var line = [];
          var tx = 0;
          var ty = 1;
          for (var k = 0; k < 6; k ++) {
            var x0 = tx;
            var y0 = ty;
            tx = x0 * cos60 - y0 * sin60;
            ty = x0 * sin60 + y0 * cos60;
            line.push(
              [tx * radius + x, ty * radius + y]
            );
          }
          result.push({
            'line' : line.join(' '),
            'lineColor' : 'rgba(128,128,128,0.1)',
            'alpha' : this.cells[i * m + j] ? Math.max(0, this.cells.length ? this.cells[i * m + j].alpha - 0.001 : 0) : 0
          });
        }
      }
      this.cells = result;
      if (Math.floor(curTime / 100) != Math.floor(this.lastBgTime / 100)) {
        for (var i = this.path.length - 1; i >= 0; i --) {
          if (this.path[i].x < 0 || this.path[i].x >= m || this.path[i].y < 0 || this.path[i].y >= n) {
            this.path[i] = this.path[this.path.length - 1];
            this.path.pop();
            continue;
          }

          this.cells[this.path[i].x + m * this.path[i].y].alpha = 0.0175;

          var k = Math.floor(Math.random() * 2);
          this.path[i].y += dir[k + this.path[i].d][0];
          this.path[i].x += dir[k + this.path[i].d][1];
          if (this.path[i].x < 0 || this.path[i].x >= m || this.path[i].y < 0 || this.path[i].y >= n) {
            this.path[i] = this.path[this.path.length - 1];
            this.path.pop();
            continue;
          }
        }
      }
      if (Math.floor(curTime / 100) != Math.floor(this.lastBgTime / 100)) {
        if (Math.random() < 0.5) {
          this.path.push({
            x : Math.round(Math.random()) * (m - 1),
            y : Math.floor(Math.random() * n),
            d : Math.floor(Math.random() * 6)
          });
        } else {
          this.path.push({
            x : Math.round(Math.random() * m),
            y : Math.floor(Math.random()) * (n - 1),
            d : Math.floor(Math.random() * 6)
          });
        }
      }
      //console.log(this.path);
      this.lastBgTime = curTime;
    },
    updateBackground: function() {
      this.updateBackground2();
      if (this.$refs.background === undefined) {
        return;
      }
      if (this.scrollPosition >= 1 - 1e-9) {
        return;
      }
      var width = this.$refs.background.clientWidth;
      var height = this.$refs.background.clientHeight;
      var maxN = Math.max(width, height) / 50;
      var centerX = width / 2;
      var centerY = height / 2;
      var interval = 250;
      var startTime = Date.now() - this.startTimer;
      var n = Math.floor(startTime / interval) + 1;
      if (n > maxN) {
        n = maxN;
        t = 0;
      }
      var sin60 = Math.sin(Math.PI / 3);
      var cos60 = Math.cos(Math.PI / 3);
      this.backgroundLines = [];
      if (this.mouseX == null) {
        this.mouseX = centerX;
        this.mouseY = centerY;
      }
      for (var i = 0; i < n && i <= 16; i ++) {
        var maxAlpha = (1 - i * 0.06) * 0.06
        var y = (i + 1) * 90 - i * i * 2.5;
        if (y >= Math.max(width, height)) {
          break;
        }
        var x = 0;
        var offsetX = (this.mouseX - centerX) * i / 120;
        var offsetY = (this.mouseY - centerY) * i / 120;
        for (var j = 0; j < 6; j ++) {
          var x0 = x;
          var y0 = y;
          x = x0 * cos60 - y0 * sin60;
          y = x0 * sin60 + y0 * cos60;
          this.backgroundLines.push({
            x0 : x0 + centerX + offsetX,
            y0 : y0 + centerY + offsetY,
            x1 : x + centerX + offsetX,
            y1 : y + centerY + offsetY,
            alpha : Math.min(1, (startTime - i * interval) / interval / 2) * maxAlpha,
            width : (10 - i) / 10 + 2
          });
        }
      }
      this.backgroundLogo = this.getLogo(width / 2, height / 2, 40);
    },
    mouseMove: function(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
    updateVertices: function() {
      if (this.$refs.window === undefined) {
        return;
      }
      if (this.scrollPosition >= 1 - 1e-9) {
        this.vertices = [];
        for (var i = 0; i < 8; i ++) {
          this.vertices.push([]);
        }
        this.edges = [];
        this.computedVertices = [];
        this.highlightedEdges = [];
        this.trans = [];
        this.computedTrans = [];
        this.startTimer = Date.now();
        this.lastTimer = Date.now();
        return;
      }
      var curTime = Date.now();
      var timerDiff = curTime - this.lastTimer;
      var width = Math.min(this.$refs.window.clientWidth, this.$refs.window.clientHeight);
      for (var k = 0; k < this.vertices.length; k ++) {
        for (var i = this.vertices[k].length - 1; i >= 0; i --) {
          this.vertices[k][i].passed += timerDiff;
          this.vertices[k][i].remain -= timerDiff;
          if (this.vertices[k][i].remain <= 0) {
            for (var j = i; j < this.vertices[k].length - 1; j ++) {
              this.vertices[k][j] = this.vertices[k][j + 1];
            }
            this.vertices[k].pop();
          }
        }
      }
      if (Math.floor(curTime / 300) != Math.floor(this.lastTimer / 300)) {
        for (var i = 0; i < this.vertices.length; i ++) {
          var p = (i == 3 || i == 4) ? 0.75 : 0.5;
          if (Math.random() < p) {
            var life = Math.random() * 2400 + 4800;
            var vertex = {
              x : Math.random() * (this.blocks[i].x1 - this.blocks[i].x0) + this.blocks[i].x0,
              y : Math.random() * (this.blocks[i].y1 - this.blocks[i].y0) + this.blocks[i].y0,
              vx : Math.random() * 0.02 - 0.01,
              vy : Math.random() * 0.02 - 0.01,
              passed : 0,
              life : life,
              remain : life,
              createAt : Date.now()
            };
            this.vertices[i].push(vertex);
          }
        }
      }
      this.lastTimer = curTime;

      var vertices = [];
      var sin45 = Math.sqrt(2) / 2;
      var sin60 = Math.sin(Math.PI / 3 * 2);

      var total = 0;

      var scale = 1 / (sin45 * 8 / 7);
      var yOffset = (1 - sin45 * scale) / 2;

      for (var k = 0; k < this.vertices.length; k ++) {
        vertices.push([]);
        var c = timerDiff / 1000;
        for (var i = 0; i < this.vertices[k].length; i ++) {
          total ++;
          this.vertices[k][i].x += this.vertices[k][i].vx * c;
          this.vertices[k][i].y += this.vertices[k][i].vy * c;
          if (this.vertices[k][i].x >= this.blocks[k].x1 || this.vertices[k][i].x < this.blocks[k].x0) {
            this.vertices[k][i].vx = -this.vertices[k][i].vx;
          }
          if (this.vertices[k][i].y >= this.blocks[k].y1 || this.vertices[k][i].y < this.blocks[k].y0) {
            this.vertices[k][i].vy = -this.vertices[k][i].vy;
          }
          var weight = 1;
          var tx = this.vertices[k][i].y * sin45 - this.vertices[k][i].x * sin45 + sin45 * 4 / 7;
          var ty = this.vertices[k][i].x * sin45 + this.vertices[k][i].y * sin45;
          vertex = {};
          vertex.x = tx * width * scale;
          vertex.y = (ty / 2 + yOffset) * width * scale;
          vertex.alpha = weight * (this.vertices[k][i].passed >= 500 ? 1 : this.vertices[k][i].passed / 500);
          if (this.vertices[k][i].remain < 500) {
            vertex.alpha = weight * this.vertices[k][i].remain / 500
          }
          vertex.alpha = vertex.alpha;
          vertices[k].push(vertex);
        }
      }
      this.computedVertices = vertices;

      for (var i = this.highlightedEdges.length - 1; i >= 0; i --) {
        this.highlightedEdges[i].time += timerDiff / 500;
        if (this.highlightedEdges[i].time >= 1) {
          this.highlightedEdges[i] = this.highlightedEdges[this.highlightedEdges.length - 1];
          this.highlightedEdges.pop();
        }
      }
      for (var i = 0; i < total / 40; i ++) {
        var b = Math.floor(Math.random() * (this.vertices.length));
        var v1 = Math.floor(Math.random() * this.vertices[b].length);
        var v2 = Math.floor(Math.random() * this.vertices[b].length);
        if (v1 != v2) {
          this.highlightedEdges.push({
            time : 0,
            block : b,
            c1 : this.vertices[b][v1].createAt,
            c2 : this.vertices[b][v2].createAt,
          });
        }
      }

      this.edges = [];
      for (var k = 0; k < this.vertices.length; k ++) {
        var c = timerDiff / 1000;
        for (var i = 0; i < this.vertices[k].length; i ++) {
          for (var j = i + 1; j < this.vertices[k].length; j ++) {
            var distance = (this.vertices[k][i].x - this.vertices[k][j].x) * (this.vertices[k][i].x - this.vertices[k][j].x) + (this.vertices[k][i].y - this.vertices[k][j].y) * (this.vertices[k][i].y - this.vertices[k][j].y);
            distance = Math.sqrt(distance);
            if (distance < 0.09) {
              var edge = {
                x0 : this.computedVertices[k][i].x.toFixed(2),
                y0 : this.computedVertices[k][i].y.toFixed(2),
                x1 : this.computedVertices[k][j].x.toFixed(2),
                y1 : this.computedVertices[k][j].y.toFixed(2),
                alpha : ((0.7 - distance / 0.09 + 0.3) * 0.64 * Math.min(this.computedVertices[k][i].alpha, this.computedVertices[k][j].alpha))
              }
              for (var i2 = 0; i2 < this.highlightedEdges.length; i2 ++) {
                if (this.highlightedEdges[i2].block == k &&
                    (this.vertices[k][i].createAt == this.highlightedEdges[i2].c1 && this.vertices[k][j].createAt == this.highlightedEdges[i2].c2 || 
                    this.vertices[k][i].createAt == this.highlightedEdges[i2].c2 && this.vertices[k][j].createAt == this.highlightedEdges[i2].c1)) {
                  edge.alpha = (1 - edge.alpha) * (1 - this.highlightedEdges[i2].time) + edge.alpha;
                }
              }
              edge.alpha = edge.alpha.toFixed(2);
              this.edges.push(edge);
            }
          }
        }
      }
      for (var i = this.trans.length - 1; i >= 0; i --) {
        this.trans[i].time += timerDiff * 2.5;
        if (this.trans[i].time >= 1500) {
          this.trans[i] = this.trans[this.trans.length - 1];
          this.trans.pop();
        }
      }
      this.computedTrans = [];
      for (var i = 0; i < this.trans.length; i ++) {
        var t = this.trans[i].time / 1000;
        var v0 = null;
        var v1 = null;
        for (var j = 0; j < this.vertices[this.trans[i].b1].length; j ++) {
          if (this.vertices[this.trans[i].b1][j].createAt == this.trans[i].c1) {
            v0 = this.computedVertices[this.trans[i].b1][j];
          }
        }
        for (var j = 0; j < this.vertices[this.trans[i].b2].length; j ++) {
          if (this.vertices[this.trans[i].b2][j].createAt == this.trans[i].c2) {
            v1 = this.computedVertices[this.trans[i].b2][j];
          }
        }
        if (v0 == null || v1 == null) {
          continue;
        }
        var trans = {};
        if (t < 1) {
          trans.x0 = v0.x;
          trans.y0 = v0.y;
        } else {
          var s = t - 1;
          s = Math.sqrt(s);
          trans.x0 = (v1.x - v0.x) * s + v0.x;
          trans.y0 = (v1.y - v0.y) * s + v0.y;
        }
        if (t >= 1) {
          trans.x1 = v1.x;
          trans.y1 = v1.y;
        } else {
          var s = t;
          s = Math.sqrt(s);
          trans.x1 = (v1.x - v0.x) * s + v0.x;
          trans.y1 = (v1.y - v0.y) * s + v0.y;
        }
        trans.x0 = trans.x0.toFixed(1);
        trans.x1 = trans.x1.toFixed(1);
        trans.y0 = trans.y0.toFixed(1);
        trans.y1 = trans.y1.toFixed(1);
        trans.alpha = (1.5 - t) * 0.45;
        this.computedTrans.push(trans);
      }
      for (var i = 0; i < total / 48; i ++) {
        var b1 = Math.floor(Math.random() * (this.vertices.length - 1));
        var v1 = Math.floor(Math.random() * this.vertices[b1].length);
        var b2 = b1 + 1;
        var v2 = Math.floor(Math.random() * this.vertices[b2].length);
        if (Math.random() < 0.5) {
          b2 = b1;
          b1 = b2 + 1;
        }
        if (b1 != b2 && this.vertices[b1][v1] && this.vertices[b2][v2]
          && this.vertices[b1][v1].remain >= 800
          && this.vertices[b2][v2].remain >= 800) {
          this.trans.push({
            b1 : b1,
            c1 : this.vertices[b1][v1].createAt,
            b2 : b2,
            c2 : this.vertices[b2][v2].createAt,
            time : 0,
          })
        }
      }

      for (var k = 0; k < this.computedVertices.length; k ++) {
        for (var i = 0; i < this.computedVertices[k].length; i ++) {
          this.computedVertices[k][i].x = this.computedVertices[k][i].x.toFixed(2);
          this.computedVertices[k][i].y = this.computedVertices[k][i].y.toFixed(2);
          this.computedVertices[k][i].alpha = this.computedVertices[k][i].alpha.toFixed(2);
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.backgroundTimer);
    window.removeEventListener('mousemove', this.mouseMove);
  }
});
$(function() {
  if (document.domain == 'ios.eco') {
    window.location.href = 'http://iost.io/';
  }
});

