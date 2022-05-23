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

let employeesData = [
	{
		allocation: 95,
		totalHours: 160
	},
	{
		allocation: 177,
		totalHours: 170
	},	{
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
let tableData = [
  {
    name: 'Rafael Martins',
    job: "Analista",
    allocation: employeesData[0].allocation + "H/" + employeesData[0].totalHours + "H",
    projectsQty: '3 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Raquel Rodrigues',
    job: "Gerente de Projetos",
    allocation: employeesData[1].allocation + "H/" + employeesData[1].totalHours + "H",
    projectsQty: '4 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Fernanda Queiroz',
    job: "DBA",
    allocation: employeesData[2].allocation + "H/" + employeesData[2].totalHours + "H",
    projectsQty: '5 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Thiago Carvalho',
    job: "Segurança da Informação",
    allocation: employeesData[3].allocation + "H/" + employeesData[3].totalHours + "H",
    projectsQty: '6 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Matheus Viana',
    job: "Analista",
    allocation:	employeesData[4].allocation + "H/" + employeesData[4].totalHours + "H",
    projectsQty: '10 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Matheus Viana',
    job: "Analista",
    allocation:	employeesData[4].allocation + "H/" + employeesData[4].totalHours + "H",
    projectsQty: '10 Projetos',
    employeeTools: employeeTools
  },
    {
    name: 'Matheus Viana',
    job: "Analista",
    allocation:	employeesData[4].allocation + "H/" + employeesData[4].totalHours + "H",
    projectsQty: '10 Projetos',
    employeeTools: employeeTools
  },
  {
    name: 'Matheus Viana',
    job: "Analista",
    allocation:	employeesData[4].allocation + "H/" + employeesData[4].totalHours + "H",
    projectsQty: '10 Projetos',
    employeeTools: employeeTools
  }
]
let employeeTable = "#employees-table"
$(employeeTable).bootstrapTable({
  data: tableData
})
// $(`.table-container`).css({
// 	"max-height": "65vh",
// 	"overflow-y": "scroll"
// })
$(`${employeeTable} tr:not(:first)`).addClass("table-body-row")

$(`${employeeTable} tr`).each(function(index) {
	if(employeesData[index].allocation > 176) {
		$(`${employeeTable} tr:eq(${index+1}) td:eq(2)`).css({
			"color": "red"
		})
	}
	else if(employeesData[index].allocation > employeesData[index].totalHours) {
		$(`${employeeTable} tr:eq(${index+1}) td:eq(2)`).css({
			"color": "orange"
		})
	}
})
