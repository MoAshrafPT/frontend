import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center footerX' color='dark' bgColor='white'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

        

        <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Social Media</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://www.facebook.com/ShellEcoMarathonCUT/' className='text-dark'>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' className='text-dark'>
                    Youtube
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Twitter
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Our Githubs</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='https://github.com/MoAshrafPT' className='text-dark'>
                    Mohamed Ashraf
                  </a>
                </li>
                <li>
                  <a href='https://github.com/KenzyRagabSobhyMohamed' className='text-dark'>
                    Kenzy Ragab
                  </a>
                </li>
                <li>
                  <a href='https://github.com/Motarek2003' className='text-dark'>
                    Mohamed Tarek
                  </a>
                </li>
                <li>
                  <a href='https://github.com/theHeliE' className='text-dark'>
                    Hazem Mohamed
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-dark'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className='text-dark' href='https://github.com/MoAshrafPT/'>
          Team 4
        </a>
      </div>
    </MDBFooter>
  );
}