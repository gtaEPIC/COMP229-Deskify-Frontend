import React from 'react'


export default function Edit() {
    return (
        <div style={{ backgroundColor: 'rgb(183, 56, 120)' }} >

            <center>

                <div style={{ backgroundColor: 'rgb(237, 201, 219)', height: '700px', width: '600px' }}>
                    
                    <label> Title: </label>
                    <br></br>
                    <input type='text' />
                    <br></br>



                    <label> Description  </label>
                    <br></br>
                    <textarea rows="10" cols="50">

                    </textarea>
                    <br></br>
                    <label> Status: </label>
                    <br></br>
                    <select name="Status" id="Status">
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <br></br>

                   
                    <label> Resolution: </label>
                    <br></br>
                    <input type='text' />
                    <br></br>
                    <label> Edit Comment: </label>
                    <br></br>
                    <input type='text' />
                    <br></br>
                    <br></br>


                    <button type="button" class="btn btn-success">Submit</button>




                </div>




            </center>


        </div>
    )
}
