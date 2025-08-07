let scoreText = 0;
let score = 0;

class GameScene extends Phaser.Scene{
    preload(){
        resize();
        addEventListener('resize', resize);

        this.load.image('fondo', 'assets/fondo.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('hund1', 'assets/hund.png');
        this.load.image('hundR', 'assets/hund.png');
        // this.load.image('leftbtn', 'assets/arrowDown.png');
        this.load.image('rightbtn', 'assets/arrowUp.png');
    }
    create(){
        this.add.sprite(238, 168, 'fondo');
        this.ball = this.physics.add.sprite(300, 200, 'ball');

        this.hund1 = this.physics.add.sprite(40, 150, 'hund1');
        this.hundR = this.physics.add.sprite(270, 150, 'hundR');

        this.pintarMarkador();

        //создание рандомной верт и гориз скорости
        const anguloInicial = Phaser.Math.DegToRad(35);
        // let anguloInicial = Math.random()*Math.PI/2 + Math.PI/4 + 0.8;
        // const derechaOIzq = Math.floor(Math.random() * 2);
        // if(derechaOIzq === 1){
        //     anguloInicial = anguloInicial + Math.PI;
        // }

        const velocydad = 350;
        const vx = Math.cos(anguloInicial) * velocydad;
        const vy = Math.sin(anguloInicial) * velocydad;
        this.ball.body.velocity.x = vx;
        this.ball.body.velocity.y = vy;

        //ДОБАВЛЕНИЕ ОТКСКОКА
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);

        //реакция на нажатие клавиш
        this.cursors = this.input.keyboard.createCursorKeys();

        //добавление кнопок управления
        this.controlesVisuales({x: 10, y: 50}, {x: 10, y: 280}, this.hund1);
        this.controlesVisualesR({x: 300, y: 50}, {x: 300, y: 280}, this.hundR);

        //столкновение объектов
        this.physics.add.collider(this.ball, this.hund1);
        this.hund1.body.immovable = true;
        this.physics.add.collider(this.ball, this.hundR);
        this.hundR.body.immovable = true;

        //добавление дополнительных точек обнаружения
        this.input.addPointer();
        this.input.addPointer();
        this.input.addPointer();

        //добавдение логики пройгрыша
        this.ball.setCollideWorldBounds(true);
        this.physics.world.setBoundsCollision(false, false, true, true);

        this.alguienGano = false;

        
    }
    
    update(){
        this.ball.rotation += 0.05;

        //реакция на нажатие клавиш
        if(this.cursors.up.isDown){
            this.hund1.y = this.hund1.y - 5;
        }else if(this.cursors.down.isDown){
            this.hund1.y = this.hund1.y + 5;
        }

        if (this.upPressed) {
        this.hund1.y -= 5;
    }
        if (this.downPressed) {
            this.hund1.y += 5;
        }

        //добавление второго игрока
        if(this.cursors.up.isDown){
            this.hundR.y = this.hundR.y - 5;
        }else if(this.cursors.down.isDown){
            this.hundR.y = this.hundR.y + 5;
        }

        if (this.upPressedR) {
        this.hundR.y -= 5;
    }
        if (this.downPressedR) {
            this.hundR.y += 5;
        }

        if (!this.alguienGano) { // Проверяем, что еще никто не выиграл
        if (this.ball.x < 0) {
            console.log('1 lose');
            this.alguienGano = true; // Устанавливаем флаг
            this.markadorHundL.text = parseInt(this.markadorHundL.text) + 1;
            this.colocarPelota(this.lose1);
        } else if (this.ball.x > 330) { // Заменяем if на else if
            console.log('2 lose');
            this.alguienGano = true; // Устанавливаем флаг
            this.markadorHundR.text = parseInt(this.markadorHundR.text) + 1;
            this.colocarPelota(this.lose2);
        }
    }
        //добавление логики пройгрыша
    //     if (!this.alguienGano) { // Проверяем, что еще никто не выиграл
    //     if (this.ball.x < 0) {
    //         console.log('1 lose');
    //         this.alguienGano = true; // Устанавливаем флаг
    //         this.colocarPelota(this.lose1);
    //     } else if (this.ball.x > 476) {
    //         console.log('2 lose');
    //         this.alguienGano = true; // Устанавливаем флаг
    //         this.colocarPelota(this.lose2);
    //     }
    // }
    }


    controlesVisuales(btn1, btn2, player){
    this.upPressed = false;
    this.downPressed = false;

    const upbtn = this.add.sprite(btn1.x, btn1.y, 'rightbtn').setInteractive();
    const downbtn = this.add.sprite(btn2.x, btn2.y, 'rightbtn').setInteractive();
    downbtn.flipY = true;

    upbtn.on('pointerdown', () => { this.upPressed = true; });
    upbtn.on('pointerup', () => { this.upPressed = false; });
    upbtn.on('pointerout', () => { this.upPressed = false; }); // чтобы отпускать, если курсор ушел

    downbtn.on('pointerdown', () => { this.downPressed = true; });
    downbtn.on('pointerup', () => { this.downPressed = false; });
    downbtn.on('pointerout', () => { this.downPressed = false; });
}
controlesVisualesR(btn1, btn2, player){
    this.upPressedR = false;
    this.downPressedR = false;

    const upbtn = this.add.sprite(btn1.x, btn1.y, 'rightbtn').setInteractive();
    const downbtn = this.add.sprite(btn2.x, btn2.y, 'rightbtn').setInteractive();
    downbtn.flipY = true;

    upbtn.on('pointerdown', () => { this.upPressedR = true; });
    upbtn.on('pointerup', () => { this.upPressedR = false; });
    upbtn.on('pointerout', () => { this.upPressedR = false; }); // чтобы отпускать, если курсор ушел

    downbtn.on('pointerdown', () => { this.downPressedR = true; });
    downbtn.on('pointerup', () => { this.downPressedR = false; });
    downbtn.on('pointerout', () => { this.downPressedR = false; });
}

    colocarPelota(lose){
    this.alguienGano = false;
        this.tweens.add({
            targets: this.ball,
            x: 165,
            y: 250,
            duration: 500,
            ease: 'Power2'
        });
    }

    pintarMarkador(){
        console.log('1111')
        this.markadorHundL = this.add.text(80, 5, '0', {fontFamily: 'Golos Text', fontSize: 50, color: '#002fffff', align: 'right',}).setOrigin(1, 0);
        this.markadorHundR = this.add.text(280, 5, '0', {fontFamily: 'Golos Text', fontSize: 50, color: '#ff0000ff',})
    }
};


let config = {
            type: Phaser.AUTO,
            width: 330,
            height: 500,
            scene: new GameScene(),
            physics:{
                default: 'arcade',
                // arcade: {
                //     debug: true,
                //     gravity:{
                //         y: 100
                //     }
                // }
            }
            // scene: [Escena],
        }
        let game = new Phaser.Game(config);

        function resize(){
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowHeight + 'px';
}
