
    export default {
        addToHomeScreen(type, key){

            if (localStorage.getItem('favorites')){

                var count_data = JSON.parse(localStorage.getItem('favorites'))
                if (!count_data[type]){
                    count_data[type] = []
                }

                let index = count_data[type].indexOf(key)
                if (index < 0){
                    count_data[type].push(key)
                    document.getElementById('fav').checked = true
                } else {
                    count_data[type].splice(index, 1)
                    document.getElementById('fav').checked = false
                }


            } else {

                var count_data = {}
                count_data[type] = []
                count_data[type].push(key)
                document.getElementById('fav').checked = true

            }

            localStorage.setItem('favorites', JSON.stringify(count_data))

        }
    }
