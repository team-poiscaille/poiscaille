<template>
  <main id="Wait">
    <div class="Information">
      <h1 class="Information__title">빠른 대전</h1>
      <div class="Information__divider"></div>
      <transition name="Fadein" mode="out-in">
        <span class="Information__description" v-if="!startedMatchmaking" key="desc">
          빠르게 상대방과 매칭합니다.
        </span>

        <span class="Information__description" v-else key="waiting">
          기다리는 중...
        </span>
      </transition>
    </div>

    <transition name="Fadein">
      <div class="Status" v-if="startedMatchmaking">
        {{current}} / {{all}}
      </div>
    </transition>

    <transition name="Popover" mode="out-in">
      <form class="Dialog Login" @submit="setName" v-if="!username">
        <label class="Input Login__input">
          <input type="text" v-model="usernameCandidate" placeholder="유저명" @input="sanitize">
        </label>
        <button class="Button Login__button" :class="{'Button--disabled': loginDisabled}" :disabled="loginDisabled">
          확인
        </button>
      </form>
      <div class="Dialog Play" key="play" v-else-if="!startedMatchmaking">
        <button class="Button Play__button" @click="startWait">
          <i class="mdi mdi-loading mdi-spin" v-if="waitingForResponse"></i>
          플레이!
        </button>
      </div>
      <div class="Dialog Waiting" key="waiting" v-else>
        <div>
          <i class="mdi mdi-loading mdi-spin"></i> 기다리는 중...
        </div>
      </div>
    </transition>
  </main>
</template>

<style lang="less" scoped>
  #Wait {
    background: #101010;
    width: 100vw;
    height: 100vh;
  }

  .Information {
    position: fixed;
    left: 6vw;
    bottom: 6vh;
    font-family: 'Noto Sans CJK KR', sans-serif;
    color: #fff;

    &__title {
      font-size: 5vw;
      font-weight: 900;
      margin: 0;
      padding: 0;
    }

    &__description {
      display: block;
      margin-top: 20px;
      font-size: 1.5rem;
      font-weight: 400;
    }

    &__divider {
      width: 7vw;
      height: 20px;
      background: #fff;
      margin-bottom: 50px;
      margin-top: 10px;
    }
  }

  .Dialog {
    background: #2b2b2b;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .3);

    display: flex;
    flex-direction: column;

    position: fixed;
    right: 6vw;
    bottom: 0;

    padding: 20px;
    padding-bottom: 50px;
  }

  .Login {
    align-items: flex-end;

    &__input {
      width: 25vw;
    }

    &__button {
      margin-top: 20px;
    }
  }

  .Status {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: #fff;
    font-family: 'Noto Sans CJK KR', sans-serif;
    font-weight: 100;
    font-size: 10vw;
  }

  .Play {
    &__button {
      width: 20vw;
    }
  }

  .Input {
    background: #3B3B3B;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px 20px;

    & > input {
      background: transparent;
      border: none;
      width: 100%;
      color: #fff;
      font-family: 'Noto Sans CJK KR', sans-serif;
      font-size: 1.25rem;
      outline: none;
    }
  }

  .Button {
    display: block;

    background: #00bcd4;
    color: #fff;
    cursor: pointer;
    font-family: 'Noto Sans CJK KR', sans-serif;
    font-size: 1.25rem;

    padding: 8px 40px;

    border-radius: 5px;
    border: none;
    outline: none;

    transition: all .4s ease;

    &:hover {
      background: lighten(#00bcd4, 5%);
    }

    &:active {
      background: darken(#00bcd4, 5%);
    }
  }

  .Waiting {
    color: #fff;
    font-family: 'Noto Sans CJK KR', sans-serif;
    font-size: 1.25rem;
  }
</style>

<script>
  export default {
    data() {
      return {
        username: null,
        waitingForResponse: false,
        startedMatchmaking: false,
        usernameCandidate: '',
        current: 0,
        all: 3
      };
    },

    computed: {
      partySearch() {
        return this.parties.filter(v => v.name.includes(this.search) || v.id.includes(this.search));
      },

      loginDisabled() {
        return this.usernameCandidate.length <= 2;
      }
    },

    methods: {
      sanitize(evt) {
        evt.target.value = evt.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
      },

      setName(event) {
        event.preventDefault();

        this.$socket.apiCall('init', {username: this.usernameCandidate}).then(id => {
          this.username = this.usernameCandidate;
          this.$game.username = this.usernameCandidate;
          this.$game.player.id = id;
        });
      },

      async startWait() {
        this.waitingForResponse = true;
        await this.$socket.apiCall('player match');
        this.startedMatchmaking = true;
      }
    },

    mounted() {
      this.$socket.on('match players', ({m, c}) => {
        this.current = c;
        this.all = m;
      });

      this.$socket.once('room match made', () => {
        this.$store.commit('phase', 'game');
      });
    }
  };
</script>
