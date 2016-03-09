Com = {

        name : 'communicator',
        
        structure : {
            
            element : 'body',
            design : 'background',
            navbar : {
                element : 'frame',
                options : {
                    element : 'container',
                    design : ['frame_element1']
                },
                search : {
                    element : 'container',
                    design : 'frame_element2'
                },
                notifications : {
                    element : 'container',
                    design : 'frame_element3'
                },
                configure : {
                    position : 'top'
                }
            },
            header : {
                element : 'header',
                logo : {
                    design : ['head_element1']
                },
                menu : {
                    element : 'container',
                    design : ['head_element2'],
                    navi : {
			element : 'module::navi',
                    }

                    
                },
                profil_sum : {
                    element : 'container',
                    design : ['head_element3']
                }
            },
            working_area : {
                element : 'working_area',
                configure : {
                    sideline_left : {
                        privacy : {
                            configure : {
                                background : 'rgb(255,99,132)'
                            }
                        },
                        messages : {
                            configure : {
                                background : 'rgb(158,222,159)'
                            }
                        },
                        matching : {
                            configure : {
                                background : 'rgb(25,156,180)'
                            }
                        },
                        community : {
                            configure : {
                                background : 'rgb(246,159,85)'
                            }
                        }
                    },
                    sideline_right : {
                        search : {
                            configure : {
                                background : 'rgb(255,99,132)'
                            }
                        },
                        help : {
                            configure : {
                               background : 'rgb(158,222,159)'
                            }
                        },
                        banking : {
                            configure : {
                                background : 'rgb(25,156,180)'
                            }
                        },
                        bugs : {
                            configure : {
                                background : 'rgb(246,159,85)'
                            }
                        }
                    }
                }
            },
            footer : {
                element : 'frame',
                options : {
                    element : 'container',
                    design : 'frame_element1'
                },
                console : {
                    element : 'container',
                    design : 'frame_element2'
                },
                chat : {
                    element : 'container',
                    design : 'frame_element3'
                },
                configure : {
                    position : 'bottom'
                }
            },
            panel_left : {
                element : 'panel',
                configure : {
                    side : 'left',
                    master : 'large_button',
                     fillwith : {
                        test : {
                            element : 'button',
                            configure : {
                                background : 'pink',
                                width : '3px'
                            }
                        },
//                        test2 : {
//                            element : 'button',
//                            design : 'plouf'
//                        }
                    }
                }
            },
            panel_right : {
                element : 'panel',
                configure : {
                    side : 'right',
                    button : 'large_button',
                }
            }
            
        },
        
        design : {
            plouf : {
                background : 'pink'
            },
            background : {
                background : 'white'
            },
            frame_element1 : {
                width : '20%',
                height : '100%',
                background : 'black'
            },
            frame_element2 : {
                width : '60%',
                height : '100%',
                background : '#333'
            },
            frame_element3 : {
                width : '20%',
                height : '100%',
                background : 'black'
            },
            head_element1 : {
                width : '20%',
                height : '100%',
                //background : '#EBEBEB'
            },
            head_element2 : {
                width : '60%',
                height : '100%',
                //background : '#F1F1F1'
            },
            head_element3 : {
                width : '20%',
                height : '100%',
                //background : '#EBEBEB'
            },
            
        },
        
        methods : {
            
        }
        
}
