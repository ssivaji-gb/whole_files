let student = [];

function aadStu(id, stname, age, classs, core) {
  if (!id || !stname || !age || !classs || !core) {
    return alert("fill in all");
  }
  let exist = student.some((s) => s.id == id);
  if (exist) {
    return alert("all ready recored");
  }

  let allData = {};
  allData.id = id;
  allData.stname = stname;
  allData.age = age;
  allData.classs = classs;
  allData.core = core;
  student.push(allData);
  return alert("recored all");
}

function viewList() {
  if (!student) {
    return alert("no recored");
  } else {
    let list = "view all st \n\n";
    student.map(
      (l) =>
        (list += `id:${l.id}\nstname:${l.stname}\nage:${l.age}\nclass:${l.classs}\nsubject${l.core}\n=====`)
    );
    return alert(list);
  }
}

function stuDelete(stuid) {
  if(!stuid){
    return alert("enter correct ID")
  }
    let Delete =student.findIndex(stu=>stu.id==stuid)
    
    if(Delete!=-1){
      student.splice(Delete,1)
      return alert("delete success")
    } 
    else{
      return alert('Enter valid id')
    }
}

function newUpdate(upDateID,newClass,newSubject){
  let studentId=student.some(s=>s.id==upDateID)
  if(!studentId){
    return alert("record not fount")
  }
  student.map(n=>{
    if(n.id==upDateID){
      if(newClass){
        n.classs=newClass
      }
      if(newSubject){
        n.core=newSubject
      }
    }
  })
  return alert('Successfully updated')
}

while (true) {
  let choice = prompt(
    "1.Add id\n2.view all list\n3.delete id\n4.update\n5.6.exit\nchoice number"
  );
  switch (choice) {
    case "1":
      let id = prompt("enter the number");
      let stname = prompt("enter the name");
      let age = prompt("enter age");
      let classs = prompt("enter the class");
      let core = prompt("enter the subject");
      aadStu(id, stname, age, classs, core);
      break

    case "2":
      viewList();
      break

    case "3":
      let stuid=prompt("enter student ID")
      stuDelete(stuid)
      break
      case"4":
      let upDateID=prompt("Enter the update ID")
      let newClass=prompt("Enter new class")
      let newCore=prompt("Enter New subject")
      newUpdate(upDateID,newClass,newCore)
      break;
case "5"
    default:
      break;
        }
}
