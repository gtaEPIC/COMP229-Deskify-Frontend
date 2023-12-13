import React, {useEffect} from 'react';
import List from './List';
import image from '../images/mainpage.png';
import {getUsername, isAuthenticated} from "../pages/login-helper";
import { left } from '@popperjs/core';
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'


export default function Main() {
  
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (!isAuthenticated()) return;
    async function fetchData() {
      try {
        let response = await fetch(`${apiURL}/ticket`);
        if (!response.ok) {
          console.log(response);
          return;
        }
        let data = await response.json();
        let allTickets = data.list;
        setTickets(allTickets.filter(ticket => ticket.user.username === getUsername()));
        setLoading(false);
      }catch (e) {
        console.log(e);
      }
    }
    fetchData().then();
  }, []);

  return (
    <body>
      <div style={{ backgroundColor: '#08181C', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding:"20px", paddingTop: '20px',}}>
        <div>
          <div>
            <h1 style={{color:"white", textAlign:"center", paddingLeft:"100px", paddingRight:"100px", paddingTop:"100px", paddingBottom:"20px"}}>Empower Your Team, Unleash Creativity: Where Collaboration Meets Simplicity!</h1>
            
            <table style={{width:"100%"}}>
              <tr>
                <td style={{textAlign:"right", paddingRight:"0px", marginRight:"0px", width:"50%"}}>
                  <table>
                    <tr>
                      <td>
                        <h2 className={"text-primary"} style={{paddingRight:"50px", fontSize:"50px"}}><b>OVERVIEW</b></h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className={"text-secondary"} style={{paddingRight:"50px"}}>
                        Welcome to the Deskify Help Desk website design document. This document
                        serves as a comprehensive blueprint for the construction and
                        implementation of our online support platform. Deskify is conceived as a
                        user-centric help desk solution that aims to streamline customer
                        service operations and enhance user engagement through efficient
                        ticketing and support mechanisms. This introduction outlines our vision,
                        objectives, and the scope of functionality intended for Deskify.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style={{textAlign:"left", paddingLeft:"0px", marginLeft:"0px"}}>
                 <img src={image} alt="left" height="500" style={{paddingTop:"0px"}} />
                </td>
              </tr>
            </table>
            <h2 className={"text-primary"} style={{paddingTop:"50px", paddingRight:"50px", fontSize:"50px", textAlign:"center"}}><b>TEAM OVERVIEW</b></h2>

            <p className={"text-secondary"} style={{textAlign:"center", paddingTop:"20px", paddingBottom:"20px"}}>
              Deskify is brought to life by a cohesive team of skilled professionals,
              each bringing a unique set of expertise to the project. Our team is
              composed of:
            </p>

            <table>
              <tr>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- Project Manager -</strong>
                  <p className={"text-secondary"} style={{textAlign:"center"}}>
                    Johnathan Hall - Johnathan oversees
                    the project's progress from conception to launch. His strategic
                    planning and keen oversight ensure that project milestones are met on
                    time and within budget.
                  </p>
                </td>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- Lead Software Engineer -</strong> 
                  <p className={"text-secondary"} style={{textAlign:"center"}}>
                    Ibtesam Mirza - Ibtesam
                    leads the software development efforts, ensuring high-quality code
                    and effective implementation of the project’s technical aspects.
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- UI Programmer -</strong> 
                  <p className={"text-secondary"}style={{textAlign:"center"}}>
                    Rodrigo Soto Acuna - Rodrigo
                    specializes in user interface programming, focusing on delivering a
                    seamless and intuitive user experience across all devices.
                  </p>
                </td>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- Security Programmer -</strong> 
                  <p className={"text-secondary"}style={{textAlign:"center"}}>
                    Mohammed Subhaan Asif Hakeem -
                    Mohammed is in charge of the platform's security, implementing robust
                    measures to protect user data and prevent breaches.
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- Database Programmer -</strong> 
                  <p className={"text-secondary"}style={{textAlign:"center"}}>
                    Anmoljeet Kaur - Anmoljeet
                    expertly manages the database architecture, ensuring the integrity and
                    performance of the data storage mechanisms.
                  </p>
                </td>
                <td style={{textAlign:"center", padding:"20px"}}>
                  <strong className={"text-primary"}>- Web Designer -</strong> 
                  <p className={"text-secondary"}style={{textAlign:"center"}}>
                    Saiham Salim Ullah - Saiham crafts the
                    website's visual elements, focusing on aesthetics, functionality, and
                    user accessibility.
                  </p>
                </td>
              </tr>
            </table>

            {isAuthenticated() && (
                <>
                  <h3 className={"text-primary"}>YOUR TICKETS: </h3>
                  <List tickets={tickets} loading={loading}/>
                </>
            )}
          </div>
        </div>
      </div>
    </body>
  );
}