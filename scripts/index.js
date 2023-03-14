
let scaleFactor;
const animationDurationFactor = 25;
const map = document.getElementById('map');
const appTitle = document.getElementById('app-title');
const submitNextBtn = document.getElementById('submit-next');
const submitStartBtn = document.getElementById('submit-start');
const resetBtn = document.getElementById('reset-block');
const servers = [...map.querySelectorAll('.server')];
const areas = [...map.querySelectorAll('.areas-block')];
const screens = [...map.querySelectorAll('.screen')];
const tableData = {
    byteCloudResults: [],
    objectStorageResults: [],
}
const storageDependency = {
    'north-america': {
        storage: 'northeastern-america-server',
        spareStorage: 'northwestern-america-server',
    },
    'south-america': {
        storage: 'northwestern-america-server',
        spareStorage: 'northeastern-america-server',
    },
    'europe': {
        storage: 'europe-server',
        spareStorage: 'northeastern-america-server',
    },
    'asia': {
        storage: 'asia-server',
        spareStorage: 'europe-server',
    },
    'oceania': {
        storage: 'asia-server',
        spareStorage: 'europe-server',
    }
    
}
const storageLatency = {
    'northeastern-america-server': {
        'north-america': 23,
        'south-america': 139,
        'europe': 82,
        'asia': 232,
        'oceania': 207,
    },
    'northwestern-america-server': {
        'north-america': 51,
        'south-america': 185,
        'europe': 141,
        'asia': 143,
        'oceania': 179,
    },
    'europe-server': {
        'north-america': 100,
        'south-america': 214,
        'europe': 11,
        'asia': 149,
        'oceania': 266,
    },
    'asia-server': {
        'north-america': 226,
        'south-america': 367,
        'europe': 251,
        'asia': 73,
        'oceania': 93,
    }
}
const numberOfUsers = {}
const videoStreaming = {
    
}

resetBtn.addEventListener('click', () => {
    window.location.reload()
})
