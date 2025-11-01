

//post request to create a task
export async function createTask(data){

    const url = 'http://localhost:3000/tasks';
    const req = {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }

    }
    const res = await fetch(url,req);
    if(!res.ok){
        return null
    }
    return await res.json();
};

//fetch all tasks with query parameters
export async function fetchAllTasks(data){
    const{status,priority} = data
    const url = `http://localhost:3000/tasks?status=${status}&priority=${priority}`;
    const res = await fetch(url);
    if(!res.ok){
        return null;
    }
    return await res.json();
}

//update task with put request
export async function updateTask(data){
    const {id} = data;
    const url = `http://localhost:3000/tasks/${id}`;
    const req = {
        method:'PUT',
        body:JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
    }
    const res = await fetch(url,req);
    if(!res.ok){
        return null;
    }
    return res.json()
}

//fetch insights data from server
export async function getInsights(){
    const url = "http://localhost:3000/tasks/insights";
    const res = await fetch(url);
    if(!res.ok){
        return null;
    }
    return res.json();

}

