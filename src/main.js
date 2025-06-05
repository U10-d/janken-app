const app = Vue.createApp({
  data() {
    return {
      hands: ["rock", "scissors", "paper"],
      cpuIndex: 0,
      currentCPUImage: "src/assets/img/rock.png",
      result: "",
      isFinish: false,
      winCount: 0,
      loseCount: 0,
      startMessage: "じゃ～ん　け～ん～",
    };
  },
  methods: {
    startCPUCycle() {
      this.intervalId = setInterval(() => {
        this.cpuIndex = (this.cpuIndex + 1) % this.hands.length;
        this.currentCPUImage = `src/assets/img/${this.cpuHand}.png`;
      }, 200);
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
      if (this.isFinish) return;

      this.stopCPUCycle();

      const randomIndex = Math.floor(Math.random() * this.hands.length);
      const cpuHand = this.hands[randomIndex];
      console.log(cpuHand);
      this.currentCPUImage = `src/assets/img/${cpuHand}.png`;
      this.startMessage = "ポン！";

      setTimeout(() => {
        if (userHand === cpuHand) {
          this.result = "引き分け";
          this.isFinish = false;
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
          this.winCount += 1;
          this.showConfetti();
          setTimeout(() => {
            this.isFinish = true;
          }, 700);
        } else {
          this.result = "あなたの負け";
          this.loseCount += 1;
          setTimeout(() => {
            this.isFinish = true;
          }, 500);
        }
      }, 500);
    },
    rematch() {
      this.startMessage = "じゃ～ん　け～ん～";
      this.startCPUCycle();
      this.isFinish = false;
      this.result = "";
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
