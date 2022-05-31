import React from 'react'
// const data ={"title":"Task created","tracks":[{"name":"name","title":"Name","value":"Tauseef"},{"name":"status","title":"Status","value":"new","displayValue":"New","oldDisplayValue":null},{"name":"priority","title":"Priority","value":"normal","displayValue":"Normal","oldDisplayValue":null},{"name":"taskDate","title":"Task date","value":"2022-05-28"},{"name":"taskDuration","title":"Task duration","value":"0"},{"name":"taskDeadline","title":"Task deadline","value":""},{"name":"assignedTo","title":"Assigned to","value":""}],"tags":[]}


export default function Message({data}) {
    let msgData
    if(data)
    {
        msgData=Object.entries(data).map((x)=>{
            return x[1].body
        })
        
    }
    
  return (
      <div>
         
    </div>
  )
}
