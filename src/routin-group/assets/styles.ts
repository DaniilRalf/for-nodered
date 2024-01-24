export const customStyleMaterial = `
        .main {
        
        
            font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
           ::-webkit-scrollbar {
                width: 7px;
                height: 7px;
            }
           ::-webkit-scrollbar-track {
                -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
                background-color: #f9f9fd;
                border-radius: 10px;
           }
           ::-webkit-scrollbar-thumb {
                background-color: #4398dd;
                border-radius: 10px;
           }
           

           .main-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                margin-right: 35px;
                
                .main-select-desc {
                    .icon {
                        transform: rotate(-90deg);
                    }
                    .text {
                        display: inline-block;
                        margin-left: 7px;
                    }
                }
                .main-select-input {
                    width: 350px;
                }
           }
           
           
           .main-add {
                margin-right: 35px;
                
                .main-add-output {
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: start;
                }
           }
           
           
           .main-outputs {
                margin-right: 35px;
           
                .main-outputs-item {
                    margin-bottom: 30px;
                    
                    .line {
                        margin-bottom: 10px;
                        display: flex;
                        opacity: 0.5;
                        .number {
                            width: 100px; 
                        }
                        .close {
                            height: 18px;
                            margin-left: 7px;
                            cursor: pointer;
                            transform: translateX(-5px)
                        }
                    }
                    
                    .outputs {
                        margin-bottom: 10px;
                        
                        .outputs-item {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            margin-bottom: 10px;
                            
                            .select {
                                width: 100%;
                                margin-right: 10px;
                            }
                        }
                    }
                    
                }
           }
           
           
           
        }
        
        hr {width: 100%;}
    `
