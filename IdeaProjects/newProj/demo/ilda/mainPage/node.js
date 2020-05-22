function createTableWork(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var date_work = document.createElement('td');
    date_work.textContent = "date_work";
    nameRow.appendChild(date_work);
    var car_id = document.createElement('td');
    car_id.textContent = "car_id";
    nameRow.appendChild(car_id);
    var master_id = document.createElement('td');
    master_id.textContent = "master_id";
    nameRow.appendChild(master_id);
    var service_id = document.createElement('td');
    service_id.textContent = "service_id"
    nameRow.appendChild(service_id);

    tab.appendChild(nameRow);

    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.date_work[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.car_id[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.master_id[i];
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.textContent = table.service_id[i];
        tr.appendChild(td5);

        tab.appendChild(tr);
    }
}

function createTableService(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var cost_foreign = document.createElement('td');
    cost_foreign.textContent = "cost_foreign";
    nameRow.appendChild(cost_foreign);
    var cost_our = document.createElement('td');
    cost_our.textContent = "cost_our";
    nameRow.appendChild(cost_our);
    var name = document.createElement('td');
    name.textContent = "name";
    nameRow.appendChild(name);
    tab.appendChild(nameRow);
    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.cost_foreign[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.cost_our[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.name[i];
        tr.appendChild(td4);

        tab.appendChild(tr);
    }
}

function createTableMaster(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var name = document.createElement('td');
    name.textContent = "name";
    nameRow.appendChild(name);
    tab.appendChild(nameRow);
    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.name[i];
        tr.appendChild(td2);

        tab.appendChild(tr);
    }
}

function createTableCar(tab, table) {
    var nameRow = document.createElement('tr');

    var id = document.createElement('td');
    id.textContent = "id";
    nameRow.appendChild(id);
    var color = document.createElement('td');
    color.textContent = "color";
    nameRow.appendChild(color);
    var is_foreign = document.createElement('td');
    is_foreign.textContent = "is_foreign";
    nameRow.appendChild(is_foreign);
    var mark = document.createElement('td');
    mark.textContent = "mark";
    nameRow.appendChild(mark);
    var num = document.createElement('td');
    num.textContent = "num"
    nameRow.appendChild(num);
    tab.appendChild(nameRow);

    for(var i = 0; i < table.id.length;i++) {
        var tr = document.createElement('tr')

        var td1 = document.createElement('td');
        td1.textContent = table.id[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = table.color[i];
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.textContent = table.is_foreign[i];
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.textContent = table.mark[i];
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.textContent = table.num[i];
        tr.appendChild(td5);

        tab.appendChild(tr);
    }
}

function deleteWorkById(elem) {
    var id_ = document.getElementById("deleteWork").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/bt/delete/works/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "date_work": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.date_work.push(personData.date_work);
                table.car_id.push(personData.cars.id)
                table.master_id.push(personData.masters.id)
                table.service_id.push(personData.services.id)
            }

            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no work with id " + id_)
        }
    });
}
function createTableShowWorks(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/works', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "date_work": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.date_work.push(personData.date_work);
                table.car_id.push(personData.cars.id)
                table.master_id.push(personData.masters.id)
                table.service_id.push(personData.services.id)
            }

            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        }
    });
}

function deleteCarById(elem) {
    var id_ = document.getElementById("deleteCar").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/bt/delete/cars/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "is_foreign": [],
                "mark": [],
                "num": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.is_foreign.push(personData.is_foreign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableCar(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no car with id " + id_)
        }
    });
}

function createTableShowCars(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/cars', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()

    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "is_foreign": [],
                "mark": [],
                "num": []
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.is_foreign.push(personData.is_foreign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableCar(tab, table);
            elem.appendChild(tab);
        }
    });
}

function deleteServiceById(elem) {
    var id_ = document.getElementById("deleteService").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/bt/delete/services/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "cost_foreign": [],
                "cost_our":[],
                "name":[]
            };

            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.cost_foreign.push(personData.cost_foreign);
                table.cost_our.push(personData.cost_our)
                table.name.push(personData.name)
            }

            if (elem != null){
                elem.innerHTML = "";
            }


            var tab =document.createElement('table');

            createTableService(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no service with id " + id_)
        }

    });
    xmlHttpRequest.send()
}

function createTableShowServices(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/services', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "cost_foreign": [],
                "cost_our":[],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.cost_foreign.push(personData.cost_foreign);
                table.cost_our.push(personData.cost_our)
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableService(tab, table);
            elem.appendChild(tab);
        }
    });
}

function deleteMasterById(elem) {
    var id_ = document.getElementById("deleteMaster").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('POST', 'http://localhost:8080/bt/delete/masters/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableMaster(tab, table);
            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 500 && countMessage < 1) {
            countMessage++;
            alert("There is no master with id " + id_)
        }
    });
}

function createTableShowMasters(elem) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/masters', true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {

            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < data.length; i++) {
                personData = data[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            if (elem != null){
                elem.innerHTML = "";
            }
            var tab =document.createElement('table');
            createTableMaster(tab, table);
            elem.appendChild(tab);
        }
    });
}

function getWorkById (elem) {
    var id_ = document.getElementById("findWork").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/works/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "date_work": [],
                "car_id": [],
                "master_id": [],
                "service_id": []
            };
            var personData;


            personData = data;
            table.id.push(personData.id);
            table.date_work.push(personData.date_work);
            table.car_id.push(personData.cars.id)
            table.master_id.push(personData.masters.id)
            table.service_id.push(personData.services.id)


            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableWork(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no work with id " + id_)
        }
    });
};

function getCarById(elem) {
    var id_ = document.getElementById("findCar").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/cars/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if(xmlHttpRequest.status === 500) {
            document.location.href = "file:///C:/Users/Mary/IdeaProjects/newProj/demo/ilda/signIn/signIn.html"
        } else if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "color": [],
                "is_foreign": [],
                "mark": [],
                "num": []
            };
            var personData;
            personData = data;
            table.id.push(personData.id);
            table.color.push(personData.color);
            table.is_foreign.push(personData.is_foreign)
            table.mark.push(personData.mark)
            table.num.push(personData.num)

            if (elem != null) {
                elem.innerHTML = "";
            }

            var tab = document.createElement('table');

            createTableCar(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no car with id " + id_)
        }

    });
}

function getMasterById(elem) {
    var id_ = document.getElementById("findMaster").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/masters/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()
    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {
        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;

            personData = data;
            table.id.push(personData.id);
            table.name.push(personData.name)


            if (elem != null){
                elem.innerHTML = "";
            }


            var tab =document.createElement('table');

            createTableMaster(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no master with id " + id_)
        }

    });
}

function getServiceById() {
    var id_ = document.getElementById("findService").value;
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', 'http://localhost:8080/bt/services/' + id_, true);
    xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequest.send()

    var countMessage = 0;
    xmlHttpRequest.addEventListener("readystatechange", () => {

        if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
            var data = JSON.parse(xmlHttpRequest.responseText);
            var table = {
                "id": [],
                "cost_foreign": [],
                "cost_our":[],
                "name":[]
            };
            var personData;

            personData = data;
            table.id.push(personData.id);
            table.cost_foreign.push(personData.cost_foreign);
            table.cost_our.push(personData.cost_our)
            table.name.push(personData.name)


            if (elem != null){
                elem.innerHTML = "";
            }

            var tab =document.createElement('table');

            createTableService(tab, table);

            elem.appendChild(tab);
        } else if (xmlHttpRequest.status === 404 && countMessage < 1) {
            countMessage++;
            alert("There is no service with id " + id_)
        }
    });
}

function getInfo(elem) {

    if (elem != null) {
        elem.innerHTML = "";
    }
    var type = document.getElementById("adding").value;
    if (type === "Master") {

        var name =document.createElement('label');
        name.textContent ="name ";
        var nameField = document.createElement('input');
        nameField.placeholder = "Enter master id";
        nameField.id = "nameFieldMaster";
        var button = document.createElement('button');
        button.id = "addMaster";
        button.type = "button";
        button.textContent = "add Master"
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);
        document.getElementById("addMaster").onclick = function () {
            let json = JSON.stringify({
                "name": document.getElementById("nameFieldMaster").value,
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/bt/addMaster', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding master was successful")
                } else if (xmlHttpRequest.status!== 200 && k < 1) {
                    k++
                    alert("Adding master was not successful")
                }
            });
        }
    }
    else if(type === "Car") {
        var color = document.createElement('label')
        color.textContent = "color ";
        var colorField = document.createElement('input');
        colorField.id = "colorFieldCar";
        colorField.placeholder = "Enter car color";
        var is_foreign = document.createElement('label')
        is_foreign.textContent = "is car foreign";
        var is_foreignField = document.createElement('input');
        is_foreignField.type = "checkbox"
        is_foreignField.checked = false;
        is_foreignField.id = "is_foreignFieldCar"
        var mark = document.createElement('label')
        mark.textContent = "mark";
        var markField = document.createElement('input');
        markField.id = "markFieldCar";
        markField.placeholder = "Enter car mark";
        var num = document.createElement('label');
        num.textContent = "car number";
        var numField = document.createElement('input');
        numField.id = "numFieldCar";
        numField.placeholder = "Enter car number";
        var button = document.createElement('button');
        button.id = "addCar";
        button.type = "button";
        button.textContent = "add Car"
        elem.appendChild(color)
        elem.appendChild(colorField)
        elem.appendChild(is_foreign)
        elem.appendChild(is_foreignField)
        elem.appendChild(mark);
        elem.appendChild(markField);
        elem.appendChild(num);
        elem.appendChild(numField);
        elem.appendChild(button);
        document.getElementById("addCar").onclick = function () {
            var c = document.querySelector('#is_foreignFieldCar');
            var is_foreignCheck
            if (c.checked) {
                is_foreignCheck = true;
            } else {
                is_foreignCheck = false;
            }
            let json = JSON.stringify({
                "color": document.getElementById("colorFieldCar").value,
                "is_foreign": is_foreignCheck,
                "mark": document.getElementById("markFieldCar").value,
                "num": document.getElementById("numFieldCar").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/bt/addCar', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding car was successful")
                } else if (xmlHttpRequest.status!== 200 && k < 1) {
                    k++
                    alert("Adding car was not successful")
                }
            });
        }

    }
    else if (type === "Service") {

        var cost_foreign = document.createElement('label')
        cost_foreign.textContent = "cost foreign ";

        var cost_foreignField = document.createElement('input');
        cost_foreignField.id = "cost_foreignFieldService";
        cost_foreignField.placeholder = "Enter cost for foreign cars";

        var cost_our = document.createElement('label')
        cost_our.textContent = "our cost";

        var cost_ourField = document.createElement('input');
        cost_ourField.id = "cost_ourFieldService";
        cost_ourField.placeholder = "Enter cost for our cars";

        var name = document.createElement('label')
        name.textContent = "service name";

        var nameField = document.createElement('input');
        nameField.id = "nameFieldService";
        nameField.placeholder = "Enter service name";

        var button = document.createElement('button');
        button.id = "addService";
        button.type = "button";
        button.textContent = "add Service"

        elem.appendChild(cost_foreign);
        elem.appendChild(cost_foreignField);
        elem.appendChild(cost_our);
        elem.appendChild(cost_ourField);
        elem.appendChild(name);
        elem.appendChild(nameField);
        elem.appendChild(button);


        document.getElementById("addService").onclick = function () {
            let json = JSON.stringify({
                "cost_foreign": document.getElementById("cost_foreignFieldService").value,
                "cost_our": document.getElementById("cost_ourFieldService").value,
                "name": document.getElementById("nameFieldService").value
            });
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open('POST', 'http://localhost:8080/bt/addService', true);
            xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xmlHttpRequest.send(json)
            var k = 0;
            xmlHttpRequest.addEventListener("readystatechange", () => {
                if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                    alert("Adding service was successful")
                } else if (xmlHttpRequest.status!== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                    k++
                    alert("Adding service was not successful")
                } else if (xmlHttpRequest.status === 400 && k < 1) {
                    k++;
                    alert("Incorrect cost")
                }
            });
        }
    }
}


let carWork;
let masterWork;
let serviceWork;

function createAddWork(elem) {

    if(elem != null) {
        elem.innerHTML = "";
    }
    localStorage.setItem('carInfo', null)
    localStorage.setItem('masterInfo', null)
    localStorage.setItem('serviceInfo', null)

    var newButton = document.createElement('button');
    newButton.id = "addWorkButton"
    newButton.textContent = "add Work";
    newButton.type = "button";
    elem.appendChild(newButton);

    var xmlHttpRequestMasters = new XMLHttpRequest();
    xmlHttpRequestMasters.open('GET', 'http://localhost:8080/bt/masters', true);
    xmlHttpRequestMasters.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestMasters.send()
    var k = 0;
    xmlHttpRequestMasters.addEventListener("readystatechange", () => {
        if (xmlHttpRequestMasters.readyState === 4 && (xmlHttpRequestMasters.status === 200)) {
            var dataMasters = JSON.parse(xmlHttpRequestMasters.responseText);
            var table = {
                "id": [],
                "name":[]
            };
            var personData;
            for (var i = 0; i < dataMasters.length; i++) {
                personData = dataMasters[i];
                table.id.push(personData.id);
                table.name.push(personData.name)
            }
            var master = document.createElement('label');
            master.textContent = "Master"

            var masterField = document.createElement('select');
            masterField.id = "selectMaster";
            for (var i = 0; i < table.id.length; i++) {
                var masterOption = document.createElement('option');
                masterOption.value = table.id[i];
                masterOption.textContent = "id: "+ table.id[i] + " number: " + table.name[i];
                masterField.appendChild(masterOption);
            }
            elem.appendChild(master)
            elem.appendChild(masterField)
            masterField.onchange = function (e) {
                localStorage.setItem('masterInfo', masterField.options[masterField.selectedIndex].value )
            }
        } else if (xmlHttpRequestMasters.status !== 200 && k < 1) {
            k++
            alert("Can not get masters")
        }
    });

    var xmlHttpRequestCars = new XMLHttpRequest();
    xmlHttpRequestCars.open('GET', 'http://localhost:8080/bt/cars', true);
    xmlHttpRequestCars.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestCars.send()
    k = 0;
    xmlHttpRequestCars.addEventListener("readystatechange", () => {
        if (xmlHttpRequestCars.readyState === 4 && (xmlHttpRequestCars.status === 200)) {
            var dataCars = JSON.parse(xmlHttpRequestCars.responseText);

            var table = {
                "id": [],
                "color": [],
                "is_foreign": [],
                "mark": [],
                "num": []
            };

            var personData;

            for (var i = 0; i < dataCars.length; i++) {
                personData = dataCars[i];
                table.id.push(personData.id);
                table.color.push(personData.color);
                table.is_foreign.push(personData.is_foreign)
                table.mark.push(personData.mark)
                table.num.push(personData.num)
            }
            var car = document.createElement('label');
            car.textContent = "Car"

            var carField = document.createElement('select');
            carField.id = "selectCar"

            for (var i = 0; i < table.id.length; i++) {
                var carIdOption = document.createElement('option');
                carIdOption.value = table.id[i];
                carIdOption.textContent = "id: "+ table.id[i] + " number: " + table.num[i] + " " ;
                carField.appendChild(carIdOption);
            }

            elem.appendChild(car)
            elem.appendChild(carField)
            carField.onchange = function (e) {
                localStorage.setItem('carInfo', carField.options[carField.selectedIndex].value )
            }
        } else if (xmlHttpRequestCars.status !== 200 && k < 1) {
            k++
            alert("Can not get cars")
        }
    });
    var xmlHttpRequestServices = new XMLHttpRequest();
    xmlHttpRequestServices.open('GET', 'http://localhost:8080/bt/services', true);
    xmlHttpRequestServices.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    xmlHttpRequestServices.send()
    k = 0;
    xmlHttpRequestServices.addEventListener("readystatechange", () => {
        if (xmlHttpRequestServices.readyState === 4 && (xmlHttpRequestServices.status === 200)) {
            var dataService = JSON.parse(xmlHttpRequestServices.responseText);

            var table = {
                "id": [],
                "cost_foreign": [],
                "cost_our":[],
                "name":[]
            };

            var personData;
            for (var i = 0; i < dataService.length; i++) {
                personData = dataService[i];
                table.id.push(personData.id);
                table.cost_foreign.push(personData.cost_foreign);
                table.cost_our.push(personData.cost_our)
                table.name.push(personData.name)
            }
            var service = document.createElement('label');
            service.textContent = "Service"

            var serviceField = document.createElement('select');
            serviceField.id = "selectService";
            for (var i = 0; i < table.id.length; i++) {
                var serviceOption = document.createElement('option');
                serviceOption.value = table.id[i];
                serviceOption.textContent = "id: "+ table.id[i] + " number: " + table.name[i];
                serviceField.appendChild(serviceOption);
            }
            elem.appendChild(service)
            elem.appendChild(serviceField)
            serviceField.onchange = function (e) {
                localStorage.setItem('serviceInfo', serviceField.options[serviceField.selectedIndex].value);
            }
        } else if (xmlHttpRequestServices.status !== 200 && k < 1) {
            k++
            alert("Can not get services")
        }
    });

    var date =  document.createElement('label');
    date.textContent = "Date";

    var dateField = document.createElement('input');
    dateField.id = "dateFieldWork";
    dateField.type = "date"

    elem.appendChild(date);
    elem.appendChild(dateField);

    newButton.onclick = function () {
        if(dateField.value === "") {
            alert("Enter date!")
        } else {
            var date = dateField.value;

        let json = JSON.stringify({
            "date_work": date,
            "carId": localStorage.getItem('carInfo'),
            "serviceId" : localStorage.getItem('serviceInfo'),
            "masterId": localStorage.getItem('masterInfo')
        })

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('POST', 'http://localhost:8080/bt/addWork', true);
        xmlHttpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xmlHttpRequest.send(json)
        var k = 0;
        xmlHttpRequest.addEventListener("readystatechange", () => {
            if (xmlHttpRequest.readyState === 4 && (xmlHttpRequest.status === 200)) {
                alert("Adding work was successful")
            } else if (xmlHttpRequest.status!== 400 && xmlHttpRequest.status !== 200 && k < 1) {
                k++
                alert("Adding work was not successful")
            }
        });
        }
    }
}

