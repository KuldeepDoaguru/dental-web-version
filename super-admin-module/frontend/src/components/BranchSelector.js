import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setBranch } from "../redux/slices/BranchSlicer";

const BranchSelector = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  // console.log(`User Name: ${branch.name}`);
  const [branchList, setBranchList] = useState();
  const [selectedBranch, setSelectedBranch] = useState();

  const getBranchList = async () => {
    try {
      const response = await axios.get(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getBranch"
      );
      console.log(response.data);
      setBranchList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const branchData = {
    name:
      selectedBranch ||
      (branchList?.length > 0 ? branchList[0].branch_name : ""),
  };
  localStorage.setItem("branchName", JSON.stringify(branchData));
  dispatch(setBranch(branchData));
  // const allBranches = Object.keys(branchList);

  useEffect(() => {
    getBranchList();
  }, []);

  // console.log(branchList);
  // console.log(selectedBranch);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div>
              <h4>Select Branch : </h4>
            </div>
            <div>
              <select
                name="branch"
                id="branch"
                className="mx-2 p-2 rounded shadow select-style"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                {/* <option value="select-branch" className="fw-bold">
                  select-branch
                </option> */}
                {branchList?.map((branch) => (
                  <option key={branch.branch_name} value={branch.branch_name}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <div>
                        <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link>
                      </div> */}
        </div>
      </Container>
    </>
  );
};

export default BranchSelector;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
