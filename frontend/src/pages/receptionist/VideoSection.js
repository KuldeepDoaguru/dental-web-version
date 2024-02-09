import React from "react";
import Sider from "../../components/receptionist/Sider";
import styled from "styled-components";
import Header from "../../components/receptionist/Header";

function VideoSection() {
  return (
    <Wrapper>
      <Header />
      <div className="row flex-nowrap">
        <div className="col-lg-1 col-1 " id="sider">
          <Sider />
        </div>
        <div className="col-lg-11">
          <div className="row">
            <div className="col-lg-11" id="res">
              <h1 className="hd text-center mt-3">
                Educational Video For Dental Care
              </h1>
              <div className="row ">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div></div> 
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="500" height="300" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
                <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                      <div class="ratio ratio-16x9">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/tFamW1_CJqM?si=jWLtIwGOF6Sj7W6d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                      </div>
                    </div>
                    <div className="card-title text-center h4">Dental Health Tip</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default VideoSection;
const Wrapper = styled.div`
  #res{
    @media screen and (max-width: 768px) {
      width: 80%;
      margin-left: 1.3rem;
    }
  }
  .hd{
    @media screen and (max-width: 768px) {
     font-size: 18px;
     margin-bottom: 12px;
    }
  }
  #sider{

    @media screen and (max-width: 768px) {
     height: 134rem;
    }
  }
  .row{
    @media screen and (max-width: 768px) {
     gap: 10px;
    }
  }
`;
