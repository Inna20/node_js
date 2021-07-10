// Для простоты передаю в аргументах сразу секунды
const EventEmitter = require('events');

let periods = process.argv.slice(2); // первые два оргумента системные

const emitterObject = new EventEmitter();
let finished = [];

// На каждый таймер из командной строки вешаем свой обработчик
for (let i=0; i < periods.length; i++) {
  let timeleft = periods[i];

  emitterObject.on('work', () => {
    if (timeleft > 0) {
      console.log('Timer' + i + ': left ' + timeleft + 'sec');
      timeleft -= 1;
    } else {
      finished[i] = i;
      console.log('Timer' + i + ': is finished');
    }
  });
}

// Каждую секунду эммитим событие, пока все таймеры не закончат работу
var downloadTimer = setInterval(function(){
  if(finished.length == periods.length){
      clearInterval(downloadTimer);
  } 
  emitterObject.emit('work')
}, 1000);