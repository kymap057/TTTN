const inputValue = document.querySelector('#ncv-search');
const tableOld = document.querySelector('#data-tbl');
function searchF(e) {
    const filter = e.target.value.toUpperCase();
    let table = document.querySelector('#data-search'),
        tr = document.getElementsByClassName('ncv-data');
    if (!e.target.value) {
        tableOld.style.display = 'block';
        table.style.display = 'none';
    }
    else {
        tableOld.style.display = 'none';
        table.style.display = 'block'
        var tableNew = '';
        for (var i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tableNew = tableNew + `<tr>${tr[i].innerHTML}</tr>`;
                }
            }
        }
        table.innerHTML = tableNew;
    }
}
inputValue.addEventListener('keyup', searchF);