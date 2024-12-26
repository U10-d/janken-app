const app = Vue.createApp({
  data() {
    return {
      hands: ["rock", "scissors", "paper"],
      cpuIndex: 0,
      currentCPUImage: "src/assets/img/rock.png",
      result: "",
      isStart: false,
      startMessage: "じゃ～ん　け～ん～",
    };
  },
  methods: {
    startCPUCycle() {
      this.intervalId = setInterval(() => {
        this.cpuIndex = (this.cpuIndex + 1) % this.hands.length;
        this.currentCPUImage = `src/assets/img/${this.cpuHand}.png`;
      }, 500);
    },
    playStart() {
      this.startGame = !this.startGame;
    },
    stopCPUCycle() {
      clearInterval(this.intervalId);
    },
    showConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
      });
    },
    playJanken(userHand) {
      this.stopCPUCycle();

      const randomIndex = Math.floor(Math.random() * this.hands.length);
      const cpuHand = this.hands[randomIndex];
      console.log(cpuHand);
      this.currentCPUImage = `src/assets/img/${cpuHand}.png`;
      this.startMessage = "ポン！";

      setTimeout(() => {
        if (userHand === cpuHand) {
          this.result = "引き分け";
          setTimeout(() => {
            this.startCPUCycle();
            this.result = "";
            this.startMessage = "あ～い　こ～で";
          }, 700);
        } else if (
          (userHand === "rock" && cpuHand === "scissors") ||
          (userHand === "scissors" && cpuHand === "paper") ||
          (userHand === "paper" && cpuHand === "rock")
        ) {
          this.result = "あなたの勝ち！";
          this.showConfetti();
        } else {
          this.result = "あなたの負け";
        }
      }, 500);
    },
  },
  computed: {
    cpuHand() {
      return this.hands[this.cpuIndex];
    },
  },
  mounted() {
    this.startCPUCycle();
  },
});
app.mount("#app");
