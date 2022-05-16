export default class service{
    GET()
    {
        const entries = []
        fetch(
            "http://localhost:3000/axelor-erp/ws/rest/com.axelor.team.db.TeamTask/search",
            {
             credentials: "include",
             method:"POST",
              mode: "cors",
              headers: {
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*",
                "Content-Type": "application/json",
                "X-Request-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "X-CSRF-Token": "0779fdf4-0894-4952-b016-7c4b81d69f4c",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              entries.push(data.data)
            })
    }
}