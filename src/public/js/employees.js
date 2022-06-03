var tagList = document.body.querySelector('.employee-tag-list')
var tagName

// função que faz a caixa de input da tag aparecer, se o usuário clicar no "+"
function newTagName() {
  tagList.innerHTML +=
    '<div id="new-tag-name"><input type="text" name="new-tag-name" id="new-tag-name" class="tag" onchange="changeInputTagValue(this.value)"><button type="button" class="tag-button" onclick="addTagElement()">ok</button></div>'
}

// função que coleta o texto inserido na caixa de input da tag
function changeInputTagValue(value) {
  tagName = value
}

// função que remove a caixa de input da tag e adiciona ela a página do funcionário, quando o usuário clicar em "ok"
function addTagElement() {
  document.getElementById('new-tag-name').remove()
  tagList.innerHTML += `<div id="${tagName}" class="tag">${tagName}</div><button type="button" class="tag-button" name="${tagName}" onclick="removeTagElement(this)">x</button>`
}

// função que remove a tag, caso o usuário clique no "x"
function removeTagElement(el) {
  document.getElementById(el.name).remove()
  el.remove()
}

// Dados da tabela de funcionários
let employeeTools = `
	<div class="employee-view">
		<!-- button trigger view employee -->
		<div class="material-symbols-outlined employee-view-button" 
		data-bs-toggle="modal"
		data-bs-target="#view-employee-modal">
		visibility
		</div>
	</div>
`

let employeeMaxHours = 176

let employeesData = [
  {
    allocation: 95,
    totalHours: 160
  },
  {
    allocation: 177,
    totalHours: 170
  },
  {
    allocation: 160,
    totalHours: 176
  },
  {
    allocation: 135,
    totalHours: 120
  },
  {
    allocation: 245,
    totalHours: 176
  }
]
let tableData = []

function getEmployeeList() {
  let url = '/allemployees'

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  data.forEach((row, index) => {
    tableData.push(row)
    tableData[index].tools = `
			<div class="employee-view">
				<!-- button trigger view employee -->
				<div class="material-symbols-outlined employee-view-button" 
					data-bs-toggle="modal"
					data-bs-target="#view-employee-modal"
					id="${row.id}"
					onclick="showEmployee(this.id)">
						visibility
				</div>
			</div>
			`
  })
}

function showEmployee(id) {
  let url = '/employee/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  console.log(data)
}
getEmployeeList()

let employeeTable = '#employees-table'
$(employeeTable).bootstrapTable({
  data: tableData
})

$(`${employeeTable} tr:not(:first)`).addClass('table-body-row')

$(employeeTable).on('sort.bs.table', function () {
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')
  }, 0)
})

let employeeRows = $('.table-body-row')
let employeeReversedRows = []
let searchInput = $('#search')

employeeRows.each(function (index, row) {
  employeeReversedRows.push(row)
})
employeeReversedRows = employeeReversedRows.reverse()

$(searchInput).keyup(function () {
  let delay = 100
  let value = searchInput[0].value

  employeeReversedRows.forEach(function (row) {
    let employeeName = row.firstChild.innerText.toUpperCase()
    value = value.toUpperCase()

    if (employeeName.includes(value)) {
      setTimeout(function () {
        $(row).css({
          display: 'table',
          border: 'solid'
        })
      }, delay)

      $(row).css({
        visibility: 'visible',
        opacity: 1,
        border: 'none'
      })
    } else {
      setTimeout(function () {
        $(row).css('display', 'none')
      }, delay)

      $(row).css({
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0.5s linear	, opacity 0.5s linear'
      })
    }

    delay += 0
  })
})

employeeRows.each(function (index) {
  if (employeesData[index].allocation > 176) {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: '#020202',
      'font-weight': 800
    })
  } else if (
    employeesData[index].allocation > employeesData[index].totalHours
  ) {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: '#D30000',
      'font-weight': 600
    })
  } else {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: 'green',
      'font-weight': 600
    })
  }
})