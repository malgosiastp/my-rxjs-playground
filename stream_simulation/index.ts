import { Observable, of, from, fromEvent, interval, combineLatest } from 'rxjs';
import { map, pluck, filter, auditTime, zip, repeat, groupBy, flatMap, toArray } from 'rxjs/operators';

const signal = [true, false, true, false, true, false];

const SIGNAL_ARRAY = ['one', 'two', 'three'];
const INTERVAL_TIME: number = 3000;
const isSignalInfinite: boolean = false;

let signal$: Observable<string>;


// SIMULATION: Emit each SIGNAL_ARRAY item every INTERVAL_TIME
// if (isSignalInfinite) {
//   signal$ = interval(INTERVAL_TIME).pipe(
//     // map(i => ARR[i % ARR.length]),
//     zip(SIGNAL_ARRAY, (a, x) => x),
//     repeat()
//   );
// } else {
//   signal$ = interval(INTERVAL_TIME).pipe(
//     zip(SIGNAL_ARRAY, (a, x) => x)
//   );
// }

// signal$.subscribe((x) => {
//   console.log(x);
// });

const zones = [
  {id: '001', label: 'Zone A'},
  {id: '002', label: 'Zone B'},
  {id: '003', label: 'Zone C'},
  {id: '004', label: 'Zone D'},
  {id: '005', label: 'Zone E'},
  {id: '006', label: 'Zone F'},
  {id: '007', label: 'Zone G'},
  {id: '008', label: 'Zone H'},
  {id: '009', label: 'Zone I'},
  {id: '010', label: 'Zone J'},
];

const selectedIds = ['002','004','005'];

const filterSelectedZones = (zoneList, selectedIds) =>
  zoneList.filter(zone => selectedIds.indexOf(zone.id) !== -1);


const zoneList$ = from(zones);
const selectedZoneIds$ = from(selectedIds);

const zones$ = combineLatest(zoneList$, selectedIds).pipe(
  groupBy(([zoneList, selectedIds]) => filterSelectedZones(zoneList, selectedIds))
)

//emit each person
const source = from(zones);
//group by age
const example = source.pipe(
  groupBy(person => person.age)
)

example.subscribe(
  group => { 
    console.log(group);
  }
);

// const ARR = ['one', 'two', 'three'];

// TAKE YOUR PICK THEY ALL DO THE SAME
// const item$ = Rx.Observable.interval(1000).map(i => ARR[i % ARR.length]);
// const item$ = Rx.Observable.interval(1000).zip(ARR, (a, x) => x).repeat();
// const item$ = Rx.Observable.interval(1000).zip(ARR).repeat().map(x => x[1]);
// const item$ = Rx.Observable.interval(1000).take(ARR.length).repeat().map(i => ARR[i]);







// const source = of(1,2,3).pipe(
//   map(x => x + 1),
//   filter(x => x > 2)
// );

// source.subscribe(x => console.log(x));



// const cities = ['rome', 'madrid', 'paris', 'brussels', 'eindhoven', 'berlin', 'copenhagen', 'stockholm'];
// const myAwesomeSearch = value => cities.filter(city => city.indexOf(value) !== -1);

// const input = document.querySelector('input');
// const suggestions = document.querySelector('#suggestions');

// fromEvent(input, 'keyup').pipe(
//   auditTime(5000),
//   pluck('target', 'value'),
//   map(value => myAwesomeSearch(value)),
//   map(cities => cities.map(city => `<li>${city}</li>`).join(''))
// ).subscribe(html => suggestions.innerHTML = html);




// const alarmOn = document.querySelector('button.on');
// const alarmOff = document.querySelector('button.off');
// let alarmState: string = '';

// alarmOn.onclick = () => {
//   alarmState = 'ALARM!!!!';
//   console.log('clicked: ', counter);
// };

// fromEvent(btn, 'click').pipe(
//   auditTime(3000)
// ).subscribe(() => console.log('Emitted click:', counter));




