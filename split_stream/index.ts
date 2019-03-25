import { combineLatest, of } from 'rxjs';
import { map, flatMap, groupBy, share, toArray, filter } from 'rxjs/operators';

interface Zone {
  id: string;
  number: number;
  label: string;
}

const zones = [
  { id: '001', number: 1, label: 'Zone A' },
  { id: '002', number: 2, label: 'Zone B' },
  { id: '003', number: 3, label: 'Zone C' },
  { id: '004', number: 4, label: 'Zone D' },
  { id: '005', number: 5, label: 'Zone E' },
  { id: '006', number: 6, label: 'Zone F' },
  { id: '007', number: 7, label: 'Zone G' },
  { id: '008', number: 8, label: 'Zone H' },
  { id: '009', number: 9, label: 'Zone I' },
  { id: '010', number: 10, label: 'Zone J' },
];

const selectedIds = ['002', '004', '005'];

const selectedHTML = document.querySelector("#selected");
const notSelectedHTML = document.querySelector("#notSelected");

const filterSelectedZones = (zoneList: Zone[], selectedIds: string[]) =>
  zoneList.filter(zone => selectedIds.indexOf(zone.id) !== -1);

const convertSelectedZones = (zoneList: Zone[], selectedIds: string[]) =>
  zoneList.map(zone => ({...zone, isAssigned: selectedIds.indexOf(zone.id) !== -1}));

const zoneList$ = of(zones);
const selectedZoneIds$ = of(selectedIds);

const zones$ = combineLatest(zoneList$, selectedZoneIds$).pipe(
  flatMap(([zoneList, selectedIds]) => convertSelectedZones(zoneList, selectedIds)),
  groupBy(zone => zone.isAssigned),
  share()
  // flatMap(group$ => group$.pipe(toArray())),

);

const assignedZones$ = zones$.pipe(
  filter(group$ => group$.key === true),
  flatMap(assignedZoneGroup$ => assignedZoneGroup$.pipe(toArray())),
  map(assignedZoneList => assignedZoneList.map(zone => `<li>${zone.id} : ${zone.label}</li>`).join(''))
).subscribe(
  html => selectedHTML.innerHTML = html
)
const notAssignedZones$ = zones$.pipe(
  filter(group$ => group$.key === false),
  flatMap(assignedZoneGroup$ => assignedZoneGroup$.pipe(toArray())),
  map(assignedZoneList => assignedZoneList.map(zone => `<li>${zone.id} : ${zone.label}</li>`).join(''))
).subscribe(
  html => notSelectedHTML.innerHTML = html
)

