import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    height: calc(100vh - 50px);
    grid-template-columns: 1fr 3fr;
    padding: 0;
    
    div.main {
        width: 100%;
        display: flex;
        height: 100%;
        flex-wrap: nowrap !important;
        flex-direction: column !important;
        max-width: 980px;
        margin: 0 auto;
        overflow-y: auto;
        
        h1 {
            margin: 0 auto
        }
    
        div#devsList {
            padding: 10px;
            display: flex;
            flex-direction: column;
            border-radius: 6px;
            height: 90%
            overflow-y: auto
        }

    }

    div.sideMenu {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-right: 1px solid #cecece;

        input {
            margin-bottom: 5px;
        }
    }
`

export const Developer = styled.div`
    min-height: 25%;
    height: 25%;
    border-bottom: 1px solid #cecece;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column

    div {
        margin: 5px 0
    }

    .label {
        margin: 0 5px
    }

`