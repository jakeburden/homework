updateUI()
trackChanges()

function updateUI () {
  var grades = []
  forEachEl('.user--input', function (grade) {
    if (validate(+grade.value)) grades.push(+grade.value)
  })

  colorCode(grades)
  setStats({
    min: document.getElementById('min'),
    max: document.getElementById('max'),
    avg: document.getElementById('avg'),
    sum: document.getElementById('sum'),
    grades: grades
  })
}

function setStats (opts) {
  if (!opts) opts = {}
  var DOMmin = opts.min
  var DOMmax = opts.max
  var DOMsum = opts.sum
  var DOMavg = opts.avg
  var grades = opts.grades

  DOMmin.appendChild(document.createElement('span'))
  printStat('#min span', getMin(grades))

  DOMmax.appendChild(document.createElement('span'))
  printStat('#max span', getMax(grades))

  DOMsum.appendChild(document.createElement('span'))
  printStat('#sum span', getSum(grades))

  DOMavg.appendChild(document.createElement('span'))
  printStat('#avg span', getAvg(grades))
}

function printStat (selector, stat) {
  document.querySelector(selector).innerHTML = stat
}

function colorCode (grades) {
  forEachEl('.user--input', function (input) {
    var grade = +input.value
    if (grade) {
      input.style.color = '#fff'

      if (grade >= 80) {
        input.style.background = '#43BB6E'
      } else if (grade >= 60) {
        input.style.background = '#F18902'
      } else {
        input.style.background = '#E80044'
      }
    } else {
      input.style.background = '#fff'
      input.style.color = '#333'
    }

    var grandparent = input.parentNode.parentNode
    var subject = grandparent.querySelector('.subject')
    if (!validate(grade)) {
      input.style.color = '#333'
      input.style.background = '#fff'
      subject.style.color = '#E80044'
      subject.parentNode.setAttribute('data-valid', 'false')
    } else {
      subject.style.color = '#333'
      subject.parentNode.setAttribute('data-valid', 'true')
    }
  })
}

function trackChanges () {
  forEachEl('.user--input', function (input) {
    input.addEventListener('keyup', function (e) {
      updateUI()
    })
  })
}

function getMin (arr) {
  return Math.min.apply(null, arr)
}

function getMax (arr) {
  return Math.max.apply(null, arr)
}

function getAvg (arr) {
  var total = getSum(arr)
  return parseInt((total / arr.length), 10)
}

function getSum (arr) {
  var sum = 0
  for (var x = 0; x < arr.length; x++) {
    sum += arr[x]
  }
  return sum
}

function forEachEl (el, cb) {
  [].forEach.call(document.querySelectorAll(el), cb)
}

function validate (value) {
  if (typeof value === 'number') {
    if (value <= 100 && value >= 0) return true
  }
}

var template = [
  '<li class="ui-list--item">',
    '<div class="row">',
      '<div class="col">',
        '<input type="text" class="subject" placeholder="Subject">',
      '</div>',
      '<div class="col">',
        '<input type="text" class="user--input" placeholder="100">',
        '<span class="denominator">/100</span>',
      '</div>',
    '</div>',
  '</li>'
].join('')

var addClassBtn = document.getElementById('addClass')
addClassBtn.addEventListener('click', function (e) {
  var uiListItem = document.createElement('li')
  uiListItem.classList = 'ui-list--item'
  uiListItem.innerHTML = template

  var uiList = document.querySelector('.ui-list')
  uiList.appendChild(uiListItem)
  updateUI()
  trackChanges()
})
