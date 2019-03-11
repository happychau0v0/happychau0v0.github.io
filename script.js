let vm;
window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data() {
      return {
        title: "5 Queen Problem",
        size: 5,
        current: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        history: [],
        result: "",
        cnt: 0
      }
    },
    methods: {
      increase_size() {
        if (this.size < 12) {
          this.size++;
          this.result = "size changed."
          this.history = [];
          this.current = this.init(this.size);
        }
        else {
          this.result = "It's too big!"
        }
      },
      decrease_size() {
        if (this.size > 4) {
          this.size--;
          this.result = "size changed."
          this.history = [];
          this.current = this.init(this.size);
        }
        else {
          this.result = "It's small enough!"
        }
      },
      clear() {
        this.current = this.init(this.size);
        this.result = "Board cleared."
      },
      init(n) {
        return new Array(n).fill(0).map(_ => new Array(n).fill(0));
      },
      toggle(i, j) {
        const newRow = this.current[i].slice(0);
        newRow[j] = !this.current[i][j];
        Vue.set(vm.current, i, newRow);
      },
      check(board) {
        var ok = 1, num = 0;
        var hi = this.init(this.size);
        // window.wa=hi;
        // window.aw=this.current;
        // window.lol=this.history;
        // window.ko = this.ok;
        for (var i = 0; i < this.current.length; i++) {
          for (var j = 0; j < this.current[i].length; j++) {
            if (this.current[i][j] == true) {
              num++;
              if (hi[i][j] == 1) ok = 0;
              for (var o = 0; o < hi.length; o++) {
                for (var p = 0; p < hi[o].length; p++) {
                  if (i == o || j == p || i + j == o + p || j - i == p - o) hi[o][p] = 1;
                }
              }
            }
          }
        }
        for (var i = 0; i < hi.length; i++) {
          for (var j = 0; j < hi[i].length; j++) {
            if (hi[i][j] == 0) ok = 0;
          }
        }
        // if (this.history.find(function(_), this.current) )
        for (var i = 0; i < this.history.length; i++) {
          var sad = 0, siz = 0;
          for (var j = 0; j < this.history[i].length; j++) {
            for (var o = 0; o < this.history[i][j].length; o++) {
              siz++;
              if (this.current[j][o] == this.history[i][j][o]) sad++;
            }
          }
          if (sad == siz) ok = 2;
        }
        if (num != this.size) ok = 0;
        if (ok == 1) {
          this.cnt++;
          this.history.push(this.current);
          this.result = "Congratulation, you have found a correct solution."
        }
        else if (ok == 2) {
          this.result = "Repeated solution!"
        }
        else {
          this.result = "That's not a correct soluton :c"
        }
        this.current = this.init(this.size);
        // print some debug message (press F12 to open console in Chrome)
        console.log('finished checking');

        // update result
        // this.result = "I don't know"
      }
    },
    beforeMount() {
      this.current = this.init(this.size)
    }
  });
};
