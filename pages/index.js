/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import Chart from 'chart.js/auto';

import { Bar, Line } from "react-chartjs-2"

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false, aliases: []},
  { name: 'Properties', href: '#', icon: BuildingOfficeIcon, current: true, aliases: ["Property", "Unit"]},
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false, aliases: [] },
]
const teams = [
  { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
  { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]

const stats = [
  { id: 1, name: 'Average Temperature', value: '72º F' },
  { id: 2, name: 'Average Daily Uptime', value: '11.3 Hours' },
  { id: 3, name: 'Average Air Quality', value: '23 PPM' },
  { id: 6, name: 'Average Humidity', value: '40%' },
  { id: 4, name: 'Last Maintenance', value: '03/12/23' },
  { id: 5, name: 'Estimated Next Maintenance', value: '10/03/23' },
]

const properties = [
  {
    address: "1523 Adams St.",
    hvacUnits: [
      { id: 'HVAC 4R-1', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-2', lastFix: '07/25/2023', status: 'Offline', color: "red"},
      { id: 'HVAC 4R-3', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-4', lastFix: '07/25/2023', status: 'Warning: Failure likely within 30 day(s)', color: "yellow"},
      { id: 'HVAC 4R-5', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-6', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-7', lastFix: '07/25/2023', status: 'Warning: Failure likely within 17 day(s)', color: "yellow"},
      { id: 'HVAC 4R-8', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-9', lastFix: '07/25/2023', status: 'Stable', color: "green"},
    ]
  },
  {
    address: "3725 Mulberry St.",
    hvacUnits: [
      { id: 'HVAC 4R-1', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-2', lastFix: '07/25/2023', status: 'Offline', color: "red"},
      { id: 'HVAC 4R-3', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-4', lastFix: '07/25/2023', status: 'Warning: Failure likely within 30 day(s)', color: "yellow"},
      { id: 'HVAC 4R-5', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-6', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-7', lastFix: '07/25/2023', status: 'Warning: Failure likely within 17 day(s)', color: "yellow"},
      { id: 'HVAC 4R-8', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-9', lastFix: '07/25/2023', status: 'Stable', color: "green"},
    ]
  },
  {
    address: "1523 Horton Blvd.",
    hvacUnits: [
      { id: 'HVAC 4R-1', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-2', lastFix: '07/25/2023', status: 'Offline', color: "red"},
      { id: 'HVAC 4R-3', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-4', lastFix: '07/25/2023', status: 'Warning: Failure likely within 30 day(s)', color: "yellow"},
      { id: 'HVAC 4R-5', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-6', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-7', lastFix: '07/25/2023', status: 'Warning: Failure likely within 17 day(s)', color: "yellow"},
      { id: 'HVAC 4R-8', lastFix: '07/25/2023', status: 'Stable', color: "green"},
      { id: 'HVAC 4R-9', lastFix: '07/25/2023', status: 'Stable', color: "green"},
    ]
  }
]

const units = [
  { id: 'HVAC 4R-1', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  { id: 'HVAC 4R-2', lastFix: '07/25/2023', status: 'Offline', color: "red"},
  { id: 'HVAC 4R-3', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  { id: 'HVAC 4R-4', lastFix: '07/25/2023', status: 'Warning: Failure likely within 30 day(s)', color: "yellow"},
  { id: 'HVAC 4R-5', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  { id: 'HVAC 4R-6', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  { id: 'HVAC 4R-7', lastFix: '07/25/2023', status: 'Warning: Failure likely within 17 day(s)', color: "yellow"},
  { id: 'HVAC 4R-8', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  { id: 'HVAC 4R-9', lastFix: '07/25/2023', status: 'Stable', color: "green"},
  // More people...
]


const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
]
const activityItems = [
  {
    commit: "asdasd",
    type: "Warning",
    message: "Failure immenent on HVAC A7-C at 253 Lincoln Ave.",
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function statusColors(unit) {
  switch (unit.color) {
    case "yellow":
      return 'bg-yellow-400 w-2 h-2 rounded-full';
      break;
    case "red":
      return 'bg-red-400 w-2 h-2 rounded-full';
      break;
    default:
      return 'bg-green-400 w-2 h-2 rounded-full';
      break;
  }
}

function countingColors(units, color) {
  let count = 0;
  for (let i = 0; i < units.length; i++) {
    if (units[i].color == color) {
      count++;
    }
  }
  return count
}

function countingAll(props) {
  let count = 0;
  for (let i = 0; i < props.length; i++) {
    for (let j = 0; j < props[i].hvacUnits.length; j++) {
        count++;
    }
  }
  return count
}

function countingColors2(props, color) {
  let count = 0;
  for (let i = 0; i < props.length; i++) {
    for (let j = 0; j < props[i].hvacUnits.length; j++) {
      if (props[i].hvacUnits[j].color == color) {
        count++;
      }
    }
  }
  return count
}

function onlyUnits(props) {
  let all = [];
  for (let i = 0; i < props.length; i++) {
    for (let j = 0; j < props[i].hvacUnits.length; j++) {
      props[i].hvacUnits[j].location = props[i].address
      all.push(props[i].hvacUnits[j])
    }
  }
  console.log(all)
  return all
}

Date.prototype.mmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('/');
};


function createDates(num) {
  var date = new Date();
  let dates = []
  for (let i = 0; i < num; i++) {
    dates.push(date.mmdd());
    date.setDate(date.getDate() + 1);
  }
  return dates
}

function generateRandomArray(length) {
  const randomArray = [];
  var date = new Date();
  for (let i = 1; i <= length; i++) {
    const randomNumber = Math.random();
    let dataPoint = 2 + (i - randomNumber)/10;
    if (date.getDay() == 0 || date.getDay() == 6) {
      dataPoint -= .2;
    }
    randomArray.push(dataPoint);
    date.setDate(date.getDate() + 1);
  }
  return randomArray;
}


export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [page, setPage] = useState("Home")
  const [property, setProperty] = useState("")
  const [unit, setUnit] = useState("")

  const [filter, setFilter] = useState("")
  const [allPropsFilter, setAllPropsFilter] = useState("")

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="bg-gray-100 min-w min-h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=900"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.name == page
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-200 px-6 ring-1 ring-white/5 border border-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=800"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          onClick={() => setPage(item.name)}
                          href={item.href}
                          className={classNames(
                            item.name == page || item.aliases.includes(page)
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-800 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-gray-300 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main className="lg:pr-96" hidden={page != "Home"}>
            <div className="sm:flex sm:items-center mx-8 my-6">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900">Needs Attention</h1>
              </div>
            </div>
            <div className="flow-root mx-8 mb-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Location
                          </th>
                          <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                            
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {onlyUnits(properties).map((unit) => (
                          page == "Home" && unit.color == "red" ? <tr key={unit.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {unit.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.location}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500"><div className={statusColors(unit)}></div></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Unit")}>
                                Manage
                              </a>
                            </td>
                          </tr> : ""
                        ))}
                        {onlyUnits(properties).map((unit) => (
                          page == "Home" && unit.color == "yellow" ? <tr key={unit.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {unit.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.location}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500"><div className={statusColors(unit)}></div></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Unit")}>
                                Manage
                              </a>
                            </td>
                          </tr> : ""
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <main className="lg:pr-96" hidden={page != "Properties"}>
            <div className="sm:flex sm:items-center mx-8 my-6">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900"> All Properties </h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Add Property
                </button>
              </div>
            </div>
            <dl className="mx-8 mb-6 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-200 p-2 cursor-pointer">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Total Units</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingAll(properties)}</dd>
              </div>
              <div className="flex flex-col bg-green-100 p-2 cursor-pointer">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Stable</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors2(properties, "green")}</dd>
              </div>
              <div className="flex flex-col bg-yellow-100 p-2 cursor-pointer">
                <dt className="text-sm font-semibold leading-6 text-gray-600">High Risk</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors2(properties, "yellow")}</dd>
              </div>
              <div className="flex flex-col bg-red-100 p-2">
                <dt className="text-sm font-semibold leading-6 text-gray-600">Offline</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors2(properties, "red")}</dd>
              </div>
            </dl>
            {allPropsFilter == "" && <div className="flow-root mx-8 mb-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Address
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Total Units
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            High Risk
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Offline
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {properties.map((prprty) => (
                          <tr key={prprty.address}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {prprty.address}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{prprty.hvacUnits.length}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{countingColors(prprty.hvacUnits, "yellow")}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{countingColors(prprty.hvacUnits, "red")}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Property")}>
                                Manage
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>}
            {allPropsFilter != "" && <div className="flow-root mx-8 mb-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Last Maintainance Date
                          </th>
                          <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                            
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {onlyUnits(properties).map((unit) => (
                          allPropsFilter == unit.color && <tr key={Date.now()}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {unit.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.lastFix}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500"><div className={statusColors(unit)}></div></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Property")}>
                                Manage
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>}
          </main>

          <main className="lg:pr-96" hidden={page != "Property"}>
            <div className="sm:flex sm:items-center mx-8 my-6">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900"> <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Properties")}>All Properties</a> {">"} 1523 Adams St.</h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Edit
                </button>
              </div>
            </div>
            <dl className="mx-8 mb-6 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col bg-gray-200 p-2 cursor-pointer" onClick={() => setFilter("")}>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Total Units</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{units.length}</dd>
              </div>
              <div className="flex flex-col bg-green-100 p-2 cursor-pointer" onClick={() => setFilter("green")}>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Stable</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors(units, "green")}</dd>
              </div>
              <div className="flex flex-col bg-yellow-100 p-2 cursor-pointer" onClick={() => setFilter("yellow")}>
                <dt className="text-sm font-semibold leading-6 text-gray-600">High Risk</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors(units, "yellow")}</dd>
              </div>
              <div className="flex flex-col bg-red-100 p-2 cursor-pointer" onClick={() => setFilter("red")}>
                <dt className="text-sm font-semibold leading-6 text-gray-600">Offline</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{countingColors(units, "red")}</dd>
              </div>
            </dl>
            <div className="flow-root mx-8 mb-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Last Maintainance Date
                          </th>
                          <th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                            
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {units.map((unit) => (
                          filter == "" || filter == unit.color ? <tr key={unit.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {unit.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.lastFix}</td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500"><div className={statusColors(unit)}></div></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{unit.status}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Unit")}>
                                Manage
                              </a>
                            </td>
                          </tr> : ""
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <main className="lg:pr-96" hidden={page != "Unit"}>
            <div className="sm:flex sm:items-center mx-8 my-6">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900"> <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Properties")}>All Properties</a> {">"} <a href="#" className="text-blue-600 hover:text-blue-900" onClick={() => setPage("Property")}>1523 Adams St.</a> {">"} HVAC 4R-7</h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Create Work Order
                </button>
              </div>
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="sm:flex sm:items-center mx-8 my-6">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold leading-6 text-gray-900">Status: Failure likely within 17 day(s)</h1>
              </div>
            </div>
            <div className='mx-8 mb-6 p-4 rounded bg-gray-200'>
              <div className="mx-auto max-w-4xl">
                <Line
                  datasetIdKey='id'
                  data={{
                    labels: createDates(30),
                    datasets: [
                      {
                        id: 1,
                        label: 'Risk Factor Projection',
                        data: generateRandomArray(30),
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className='mx-8 my-6'>
              <dl className="mt-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col bg-gray-200 p-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </main>

          {/* Activity feed */}
          <aside className="bg-gray-200 border-l border-gray-300 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-gray-300 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base font-semibold leading-7 text-gray-800">Notifications</h2>
              <a href="#" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-900">
                View all
              </a>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {activityItems.map((item) => (
                <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-300">
                  <div className="flex items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-800">{item.type}</h3>
                    <time dateTime={item.dateTime} className="flex-none text-xs text-gray-800">
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-3 text-sm text-gray-800">
                    {item.message}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  )
}
