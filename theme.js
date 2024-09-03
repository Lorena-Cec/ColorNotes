function selectTheme(schema) {
    console.log("KF");
    document.querySelectorAll('button').forEach(el => el.classList.remove('selected'));
    document.getElementById(schema).classList.add('selected');

    document.querySelector('body').className = schema;
    document.getElementById('logo').src = `images/${schema}.png`;
    document.getElementById('container-left').className = schema;  
    document.getElementById('container-right').className = schema;  
    document.getElementById('search-text').className = schema;  
    document.getElementById('btn-search').className = `fa-solid fa-search ${schema}`;  
    document.getElementById('add-notes').className = schema; 
    document.getElementById('notes-list').className = schema; 
}
