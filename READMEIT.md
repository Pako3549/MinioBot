<h1> MinioBot </h1>
<h2> Come farlo funzionare </h2>
Per far funzionare questo codice, devi installare la libreria <a href="https://github.com/OttoDIY/OttoDIYLib"><span style="color:blue"><Otto.h></span></a>.
Dopo aver installato il file zip, implementalo nell'IDE di Arduino (Sketch --> Include Libreria --> Includi Libreria da file .zip).

Alla fine, apri il file .ino: quando lo aprirai, Arduino ti chiederà di creare una cartella dedicata, ovviamente concediglielo.
<h1> Librerie, Variabili, Macro e Servomotori </h1>
Sono state incluse 3 librerie:

- <code href="https://github.com/arduino-libraries/Servo">Servo.h</code>: offre la possibilità di cambiare l'angolo dei servomotori con alta precisione.

- <code href="https://docs.arduino.cc/learn/built-in-libraries/software-serial"><SoftwareSerial.h></code>: consente la comunicazione seriale tra pin digitali.

- <code href="https://github.com/OttoDIY/OttoDIYLib"><Otto.h></code>: libreria di Otto, consente di implementare funzioni utili, come <code>Otto.walk()</code>.

Ci sono due sezioni principali di <strong> #define </strong>:

- <em> Defining notes </em>: in questa sezione è stato assegnato a ciascuna nota una frequenza, per rendere più semplice e comprensibile la dichiarazione degli array delle melodie.
```C++
///////////////////////////////////////////////////////////////////
//-- Defining Notes ---------------------------------------------//
///////////////////////////////////////////////////////////////////

#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976
#define NOTE_C7  2093
#define NOTE_CS7 2217
#define NOTE_D7  2349
#define NOTE_DS7 2489
#define NOTE_E7  2637
#define NOTE_F7  2794
#define NOTE_FS7 2960
#define NOTE_G7  3136
#define NOTE_GS7 3322
#define NOTE_A7  3520
#define NOTE_AS7 3729
#define NOTE_B7  3951
#define NOTE_C8  4186
#define NOTE_CS8 4435
#define NOTE_D8  4699
#define NOTE_DS8 4978
#define REST      0
```
- <em> Defining Servos and others </em> : in questa sezione viene definito ogni servo e sensore.
```C++
///////////////////////////////////////////////////////////////////
//-- Defining servos and others ---------------------------------//
///////////////////////////////////////////////////////////////////
#define LeftLeg 2 // Guardando MinioBot da davanti
#define RightLeg 3 // Guardando MinioBot da davanti
#define LeftFoot 4 // Guardando MinioBot da davanti
#define RightFoot 5 // Guardando MinioBot da davanti
#define Buzzer 13
#define RightArm 6 // Guardando MinioBot da davanti
#define LeftArm 7 // Guardando MinioBot da davanti
Servo Servo_6; /* Braccio destro */
Servo Servo_7; /* Braccio sinistro */
Servo Servo_5; /* Piede destro */
Servo Servo_4; /* Piede sinistro */
```
Also there are many variables tied to many important functions. They are:
```C++
bool walkForward = false;
bool walkBackwards = false; // they're tied to the functions walkForward_si and walkBackwards_si; they're used to stop the walk functions while they're false.
int Piezo = 13; // Buzzer, used to play the melodies' notes
int rxPin = 11; 
int txPin = 12; // they're used to initialize rx and tx pin used by the bluetooth module HC-06.
int i = 0; // used to stop the fly function while its value is equal to 0.
char message; // used to memorize the message sent by the user, wich'll trigger one of the switch cases situated in the loop function.
```
<h1> Functions </h1>
In questo codice, ci sono due tipi di funzioni:
- <em> MinioBot All Moves </em>: quelle che muovono i servo di MinioBot.

- <em> Melodies </em>: quelle che permettono al Buzzer di riprodurre melodie.
<h2> MinioBot All Moves </h2>

<code>startArms()</code>: mette entrambe le braccia a una posizione neutrale.
```C++
///////////////////////////////////////////////////////////////////
//-- MinioBot All Moves -----------------------------------------//
///////////////////////////////////////////////////////////////////
void startArms(){
  Servo_6.write(0); delay(100); 
  Servo_7.write(180); delay(100); 
}
```

<code>move_RightArm()</code>: alza/abbassa il braccio destro.
```C++
void move_RigthArm() {
  if(Servo_6.read() == 0){
    Servo_6.write(90);
    Servo_6.write(1); 
    Servo_6.write(180);
  } else{
    Servo_6.write(0);
  }
}
```
<code>move_LeftArm()</code>: alza/abbassa il braccio sinistro.
```C++
void move_LeftArm() {
  if(Servo_7.read() == 180){
    Servo_7.write(90); 
    Servo_7.write(179); 
    Servo_7.write(5);
  } else{
    Servo_7.write(180);
  }
}
```
<code>bothArms()</code>: alza/abbassa entrambe le braccia.
```C++
void bothArms() {
  if(Servo_6.read() == 0 && Servo_7.read() == 180){
    Servo_6.write(180);
    Servo_7.write(0);
  } else{
    Servo_6.write(0);
    Servo_7.write(180);
  }
}
```
<code>walkForward_si()</code>: MinioBot cammina mentre walkForward è vera.
```C++
void walkForward_si(){
  while(walkForward = true){
    Otto.walk(1, 750, 1);
    message = char(bluetooth.read());
       if (message=='h'){
       walkForward = false;
    }
  }
}
```
<code>walkBackwards_si()</code>: MinioBot cammina all'indietro mentre walkBackwards è vera.
```C++
void walkBackwards_si(){
  while(walkBackwards = true){
    Otto.walk(1, 750, -1);
    message = char(bluetooth.read());
       if (message=='h'){
       walkBackwards = false;
    }
  }
}
```
<code>TurnLeft()</code>: MinioBot gira a sinistra facendo 5 passi.
```C++
void TurnLeft(){
  Otto.turn(5, 750, 1);
}
```
<code>TurnRight()</code>: MinioBot gira a destra facendo 5 passi.
```C++
void TurnRight(){
  Otto.turn(5, 750, -1);
}
```
<code>fly()</code>: MinioBot "vola" (non vola per davvero, alza e abbassa le braccia in simultanea :p).
```C++
void fly(){
  for (i=0; i<10;i++){
    Servo_6.write(90) ; delay(100);
    Servo_7.write(90); delay(100);
    Servo_6.write(0) ; delay(100);
    Servo_7.write(180); delay(45);
    message = char(bluetooth.read());
    if (message=='0'){
      break;
    }
  }
}
```
<h2> Melodies </h2>

The code written to make the Buzzer play these melodies is from <a href="https://github.com/robsoncouto/arduino-songs"> this </a> repository, but it has been readapted to work with Miniobot. Here's the code:
```C++
///////////////////////////////////////////////////////////////////
//-- Melodies ---------------------------------------------------//
///////////////////////////////////////////////////////////////////

void HappyBirthday(){
int tempo = 140;

int melody[] = {

  NOTE_C4,4, NOTE_C4,8, 
  NOTE_D4,-4, NOTE_C4,-4, NOTE_F4,-4,
  NOTE_E4,-2, NOTE_C4,4, NOTE_C4,8, 
  NOTE_D4,-4, NOTE_C4,-4, NOTE_G4,-4,
  NOTE_F4,-2, NOTE_C4,4, NOTE_C4,8,

  NOTE_C5,-4, NOTE_A4,-4, NOTE_F4,-4, 
  NOTE_E4,-4, NOTE_D4,-4, NOTE_AS4,4, NOTE_AS4,8,
  NOTE_A4,-4, NOTE_F4,-4, NOTE_G4,-4,
  NOTE_F4,-2,
 
  };

int notes = sizeof(melody) / sizeof(melody[0]) / 2;

int wholenote = (60000 * 4) / tempo;

int divider = 0, noteDuration = 0;
  for (int thisNote = 0; thisNote < notes * 2; thisNote = thisNote + 2) {
    divider = melody[thisNote + 1];
    if (divider > 0) {
      noteDuration = (wholenote) / divider;
    } else if (divider < 0) {
      noteDuration = (wholenote) / abs(divider);
      noteDuration *= 1.5; 
    }
    tone(Piezo, melody[thisNote], noteDuration * 0.9);
    delay(noteDuration);
    noTone(Piezo);
  }
}

void MerryChristmas(){
  int tempo = 140;
  int melody[] = {
  NOTE_C5,4, 
  NOTE_F5,4, NOTE_F5,8, NOTE_G5,8, NOTE_F5,8, NOTE_E5,8,
  NOTE_D5,4, NOTE_D5,4, NOTE_D5,4,
  NOTE_G5,4, NOTE_G5,8, NOTE_A5,8, NOTE_G5,8, NOTE_F5,8,
  NOTE_E5,4, NOTE_C5,4, NOTE_C5,4,
  NOTE_A5,4, NOTE_A5,8, NOTE_AS5,8, NOTE_A5,8, NOTE_G5,8,
  NOTE_F5,4, NOTE_D5,4, NOTE_C5,8, NOTE_C5,8,
  NOTE_D5,4, NOTE_G5,4, NOTE_E5,4,

  NOTE_F5,2,
};
  int notes = sizeof(melody) / sizeof(melody[0]) / 2;

  int wholenote = (60000 * 4) / tempo;

  int divider = 0, noteDuration = 0;

  for (int thisNote = 0; thisNote < notes * 2; thisNote = thisNote + 2) {

    divider = melody[thisNote + 1];
    if (divider > 0) {
      noteDuration = (wholenote) / divider;
    } else if (divider < 0) {
      noteDuration = (wholenote) / abs(divider);
      noteDuration *= 1.5; 
    }

    tone(Piezo, melody[thisNote], noteDuration * 0.9);

    delay(noteDuration);

    noTone(Piezo);
  }
}

void rickroll(){
  int tempo = 114;
  int melody[] = {

  NOTE_D5,-4, NOTE_E5,-4, NOTE_A4,4, //1
  NOTE_E5,-4, NOTE_FS5,-4, NOTE_A5,16, NOTE_G5,16, NOTE_FS5,8,
  NOTE_D5,-4, NOTE_E5,-4, NOTE_A4,2,
  NOTE_A4,16, NOTE_A4,16, NOTE_B4,16, NOTE_D5,8, NOTE_D5,16,
  NOTE_D5,-4, NOTE_E5,-4, NOTE_A4,4, //repeat from 1
  NOTE_E5,-4, NOTE_FS5,-4, NOTE_A5,16, NOTE_G5,16, NOTE_FS5,8,
  NOTE_D5,-4, NOTE_E5,-4, NOTE_A4,2,
  NOTE_A4,16, NOTE_A4,16, NOTE_B4,16, NOTE_D5,8, NOTE_D5,16,
  REST,4, NOTE_B4,8, NOTE_CS5,8, NOTE_D5,8, NOTE_D5,8, NOTE_E5,8, NOTE_CS5,-8,
  NOTE_B4,16, NOTE_A4,2, REST,4, 

  REST,8, NOTE_B4,8, NOTE_B4,8, NOTE_CS5,8, NOTE_D5,8, NOTE_B4,4, NOTE_A4,8, //7
  NOTE_A5,8, REST,8, NOTE_A5,8, NOTE_E5,-4, REST,4, 
  NOTE_B4,8, NOTE_B4,8, NOTE_CS5,8, NOTE_D5,8, NOTE_B4,8, NOTE_D5,8, NOTE_E5,8, REST,8,
  REST,8, NOTE_CS5,8, NOTE_B4,8, NOTE_A4,-4, REST,4,
  REST,8, NOTE_B4,8, NOTE_B4,8, NOTE_CS5,8, NOTE_D5,8, NOTE_B4,8, NOTE_A4,4,
  NOTE_E5,8, NOTE_E5,8, NOTE_E5,8, NOTE_FS5,8, NOTE_E5,4, REST,4,
   
  NOTE_D5,2, NOTE_E5,8, NOTE_FS5,8, NOTE_D5,8, //13
  NOTE_E5,8, NOTE_E5,8, NOTE_E5,8, NOTE_FS5,8, NOTE_E5,4, NOTE_A4,4,
  REST,2, NOTE_B4,8, NOTE_CS5,8, NOTE_D5,8, NOTE_B4,8,
  REST,8, NOTE_E5,8, NOTE_FS5,8, NOTE_E5,-4, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16,
  NOTE_FS5,-8, NOTE_FS5,-8, NOTE_E5,-4, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16,

  NOTE_E5,-8, NOTE_E5,-8, NOTE_D5,-8, NOTE_CS5,16, NOTE_B4,-8, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16, //18
  NOTE_D5,4, NOTE_E5,8, NOTE_CS5,-8, NOTE_B4,16, NOTE_A4,8, NOTE_A4,8, NOTE_A4,8, 
  NOTE_E5,4, NOTE_D5,2, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16,
  NOTE_FS5,-8, NOTE_FS5,-8, NOTE_E5,-4, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16,
  NOTE_A5,4, NOTE_CS5,8, NOTE_D5,-8, NOTE_CS5,16, NOTE_B4,8, NOTE_A4,16, NOTE_B4,16, NOTE_D5,16, NOTE_B4,16,

  NOTE_D5,4, NOTE_E5,8, NOTE_CS5,-8, NOTE_B4,16, NOTE_A4,4, NOTE_A4,8,  
  NOTE_E5,4, NOTE_D5,2, REST,4,
};
  int notes = sizeof(melody) / sizeof(melody[0]) / 2;

  int wholenote = (60000 * 4) / tempo;

  int divider = 0, noteDuration = 0;
    
  for (int thisNote = 0; thisNote < notes * 2; thisNote = thisNote + 2) {

    divider = melody[thisNote + 1];
    if (divider > 0) {
      noteDuration = (wholenote) / divider;
    } else if (divider < 0) {
      noteDuration = (wholenote) / abs(divider);
      noteDuration *= 1.5; 
    }

    tone(Piezo, melody[thisNote], noteDuration * 0.9);

    delay(noteDuration);

    noTone(Piezo);
  }
}
```
<h1> Setup </h1>
In <code>setup()</code> sensors and pins get initialized with certain parameters.


```C++
///////////////////////////////////////////////////////////////////
//-- Setup ------------------------------------------------------//
///////////////////////////////////////////////////////////////////

void setup() {
  pinMode(Piezo, OUTPUT); // pin 13 gets initialized as "OUTPUT", because a Buzzer playing "outputs" sounds
  Serial.begin(9600); // sets serial communication between digital pin at 9600 baud rate
  bluetooth.begin(9600); // sets serial communication beetween HC-06 and user's device at 9600 baud rate
  Servo_6.attach(RightArm);
  Servo_7.attach(LeftArm); // initializes RightArm and LeftArm using a function from <Servo.h>
  Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Piezo);  
  startArms(); // sets arms in a neutral position
  Otto.sing(S_connection); // makes the Buzzer play the connection sound (beep)
  Otto.home(); // sets legs and foots in a neutral position
}
```
<h1> Loop </h1>
Every time the function <code>Loop()</code> gets executed, the variable <em> message </em> (wich contains the message that the user sent) passes through the switch, if bluetooth is avaible; certain chars can trigger cases of the switch and in these are called the functions that have been declared earlier.
It's important to say that the <code>Loop()</code> function is the core of this code: without it, MinioBot can't do a thing (except for the setup initializations).

```C++
///////////////////////////////////////////////////////////////////
//-- Principal Loop ---------------------------------------------//
///////////////////////////////////////////////////////////////////
void loop(){
  Serial.println("Start"); // to notice, using the serial monitor, when the loop() function gets executed
  if (bluetooth.available()) {
    message = char(bluetooth.read()); // the data memorized in the variable "message" gets pverwritten with the char that the user sent using Bluetooth
    Serial.println("message="); 
    Serial.println(message); // prints what's contained in the variable "message"
    switch(message)
    {
      case 'a':
          move_RigthArm();
          break;
      case 'b':
          move_LeftArm();
          break;
      case 'c':
          bothArms();
          break;
     case 'f':
          fly();
          break;
     case 'g':
          walkForward = !walkForward;
          walkForward_si();
          break;
     case 'i':
          HappyBirthday();
          break;     
     case 'l':
          walkBackwards_si();
          break;
     case 'p':
          MerryChristmas();
          break;
     case 'n':
          TurnLeft();
          break;
     case 'o':
          TurnRight();
          break;
     case 'r':
          rickroll();
          break;
    }
  }
}
```
