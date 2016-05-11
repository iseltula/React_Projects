module.exports ={
  init: function(){
    localStorage.clear();
    localStorage.setItem('workouts', JSON.stringify([
      {
        id: 0001,
        type: 'jogging',
        minutes: 20,
        miles: 2,
        date: new Date()
      },
      {
        id: 0002,
        type: 'yoga',
        minutes: 20,
        miles: '',
        date: new Date()
      }
    ]));
  }
}
