export class Interface {
    constructor({ player, enemy }) {
        this.timerId;
        this.player = player;
        this.enemy = enemy;
    }

    determinateWinner() {
        clearTimeout(this.timerId)
        if (this.player.health === this.enemy.health) {
            document.querySelector("#game-result").innerHTML = 'Tie';
        }
        else if (this.player.health > this.enemy.health) {
            document.querySelector("#game-result").innerHTML = 'Player 1 Won';
        }
        else if (this.player.health < this.enemy.health) {
            document.querySelector("#game-result").innerHTML = 'Player 2 Won';
        }
    }

    timerTick(time) {
        if (time > 0) {
            this.timerId = setTimeout(() => this.timerTick(time--), 1000)
            time--;
            document.querySelector("#timer").innerHTML = time;
        }
        if (time === 0) {
            document.querySelector("#game-result").style.display = 'flex';
            this.determinateWinner();
        }

    }

    detectColitionLeft({ rec1, rec2 }) {
        return (rec1.attackBox.position.x - rec1.offset.x < rec2.position.x + rec2.width &&
            rec1.attackBox.position.x + rec1.attackBox.width - rec1.offset > rec2.position.x &&
            rec1.attackBox.position.y < rec2.position.y + rec2.height &&
            rec1.attackBox.position.y + rec1.attackBox.height > rec2.position.y)
    }

    detectColitionRight({ rec1, rec2 }) {
        return (rec1.attackBox.position.x + rec1.attackBox.width > rec2.position.x &&
            rec1.attackBox.position.x < rec2.position.x + rec2.width &&
            rec1.attackBox.position.y < rec2.position.y + rec2.height &&
            rec1.attackBox.position.y + rec1.attackBox.height > rec2.position.y)

    }
}

