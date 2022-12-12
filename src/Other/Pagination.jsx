import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  ItemPerPage: PropTypes.number,
  TotalItem: PropTypes.number,
  pageClickFunction: PropTypes.func,
};
Pagination.defaultProps = {
  ItemPerPage: 1,
  TotalItem: 1,
  pageClickFunction: null,
};
function Pagination({ ItemPerPage, TotalItem, pageClickFunction }) {
  const PageNumber = [];
  const CurrentPage = useRef(1);
  const nextNum=5;
  const [ListPageNum, setListPageNum] = useState({
    firstNum: 1,
    secondNum: 2,
    thirdNum: 3,
    fourthNum: 4,
    fifthNum: 5,
    sixthNum: 6,
  });
  const LastPage = Math.ceil(TotalItem / ItemPerPage);
  for (let i = 1; i <= Math.ceil(TotalItem / ItemPerPage); i++) {
    PageNumber.push(i);
  }

  return (
    <div className="PageContainer">
      <div
        className="PageContainer__PageNum"
        onClick={() => {
          pageClickFunction(ListPageNum.firstNum);
          console.log(ListPageNum.firstNum);
          if (ListPageNum.firstNum >= nextNum && ListPageNum.firstNum !== 1) {
            setListPageNum({
              ...ListPageNum,
              firstNum: ListPageNum.firstNum - nextNum,
              secondNum: ListPageNum.secondNum - nextNum,
              thirdNum: ListPageNum.thirdNum - nextNum,
              fourthNum: ListPageNum.fourthNum - nextNum,
              fifthNum: ListPageNum.fifthNum - nextNum,
              sixthNum: ListPageNum.sixthNum - nextNum,
            });
                              
          }         
          CurrentPage.current=ListPageNum.firstNum;
        }}
      >
        <span> {"<<"} </span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.firstNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.firstNum);
          CurrentPage.current = ListPageNum.firstNum;
        }}
      >
        <span>{ListPageNum.firstNum}</span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.secondNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.secondNum);
          CurrentPage.current = ListPageNum.secondNum;
        }}
      >
        <span>{ListPageNum.secondNum}</span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.thirdNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.thirdNum);
          CurrentPage.current = ListPageNum.thirdNum;
        }}
      >
        <span>{ListPageNum.thirdNum}</span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.fourthNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.fourthNum);
          CurrentPage.current = ListPageNum.fourthNum;
        }}
      >
        <span>{ListPageNum.fourthNum}</span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.fifthNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.fifthNum);
          CurrentPage.current = ListPageNum.fifthNum;
        }}
      >
        <span>{ListPageNum.fifthNum}</span>
      </div>
      <div
        className={CurrentPage.current===ListPageNum.sixthNum ? 'PageContainer__PageNum--active' : 'PageContainer__PageNum'}
        onClick={() => {
          pageClickFunction(ListPageNum.sixthNum);
          CurrentPage.current = ListPageNum.sixthNum;
        }}
      >
        <span>{ListPageNum.sixthNum}</span>
      </div>
      <div
        className="PageContainer__PageNum"
        onClick={() => {
          pageClickFunction(ListPageNum.sixthNum);
          if (
            ListPageNum.sixthNum <= LastPage - nextNum &&
            ListPageNum.sixthNum !== LastPage
          ) {
            setListPageNum({
              ...ListPageNum,
              firstNum: ListPageNum.firstNum + nextNum,
              secondNum: ListPageNum.secondNum + nextNum,
              thirdNum: ListPageNum.thirdNum + nextNum,
              fourthNum: ListPageNum.fourthNum + nextNum,
              fifthNum: ListPageNum.fifthNum + nextNum,
              sixthNum: ListPageNum.sixthNum + nextNum,
            });
          }
          CurrentPage.current=ListPageNum.sixthNum;
        }}
      >
        <span> {">>"} </span>
      </div>
      {/* <div className="Pagelinks">
              <div
                className={CurrentPage.current===ListPageNum.firstNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.firstNum);
                  console.log(ListPageNum.firstNum);
                  if (ListPageNum.firstNum >= 4 && ListPageNum.firstNum !== 1) {
                    setListPageNum({
                      ...ListPageNum,
                      firstNum: ListPageNum.firstNum - 4,
                      secondNum: ListPageNum.secondNum - 4,
                      thirdNum: ListPageNum.thirdNum - 4,
                      fourthNum: ListPageNum.fourthNum - 4,
                      fifthNum: ListPageNum.fifthNum - 4,
                      sixthNum: ListPageNum.sixthNum - 4,
                    });
                                      
                  }
                 
                  CurrentPage.current=ListPageNum.firstNum;
                }}
              >
                <span>{ListPageNum.firstNum}</span>
              </div>
              <div
                className={CurrentPage.current===ListPageNum.secondNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.secondNum);
                  CurrentPage.current=ListPageNum.secondNum;
                }}
              >
                <span>{ListPageNum.secondNum}</span>
              </div>
              <div
                className={CurrentPage.current===ListPageNum.thirdNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.thirdNum);
                  CurrentPage.current=ListPageNum.thirdNum;
                }}
              >
                <span>{ListPageNum.thirdNum}</span>
              </div>
              <div
                className={CurrentPage.current===ListPageNum.fourthNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.fourthNum);
                  CurrentPage.current=ListPageNum.fourthNum;
                }}
              >
                <span>{ListPageNum.fourthNum}</span>
              </div>
              <div
                className={CurrentPage.current===ListPageNum.fifthNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.fifthNum);
                  CurrentPage.current=ListPageNum.fifthNum;
                }}
              >
                <span>{ListPageNum.fifthNum}</span>
              </div>
              <div
                className={CurrentPage.current===ListPageNum.sixthNum ? 'iPagelinksActive' : 'iPagelinks'}
                onClick={() => {
                  pageClickFunction(ListPageNum.sixthNum);
                  if (
                    ListPageNum.sixthNum <= LastPage - 4 &&
                    ListPageNum.sixthNum !== LastPage
                  ) {
                    setListPageNum({
                      ...ListPageNum,
                      firstNum: ListPageNum.firstNum + 4,
                      secondNum: ListPageNum.secondNum + 4,
                      thirdNum: ListPageNum.thirdNum + 4,
                      fourthNum: ListPageNum.fourthNum + 4,
                      fifthNum: ListPageNum.fifthNum + 4,
                      sixthNum: ListPageNum.sixthNum + 4,
                    });
                  }
                  CurrentPage.current=ListPageNum.sixthNum;
                }}
              >
                <span>{ListPageNum.sixthNum}</span>
              </div>
            </div> */}
    </div>
  );
}

export default Pagination;
