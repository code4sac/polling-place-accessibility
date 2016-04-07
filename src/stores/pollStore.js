const store = {};

store.ppid = null;

store.countObservers = 0;

store.observers = new Set();

store.setPPID = function(p) {
  store.ppid = p;
  this.onChange();
};

store.observeChanges = function(fn){
  this.observers.add(fn);
};
store.unobserveChanges = function(fn){
  this.observers.delete(fn);
};

store.onChange = function(){
  console.log('store changed!');
  console.log(this.observers);
  this.observers.forEach(function(observer){
    observer({ppid: store.ppid});
  });
};

export default store;
