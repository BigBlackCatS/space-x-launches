import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { Subject, switchMap, concatMap, tap, take, finalize } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

export default function LaunchDataTableComponent(props:any) {
    const [pastLaunches, setPastLaunches] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [callCounter, setcallCounter] = useState(0);
    const navigate = useNavigate();

    const columns = [
        {
            name: "Name",
            selector: (row: any) => row.name
        },
        {
            name: "DateUtc",
            selector: (row: any) => row.fireDateUtc
        }
    ];

    const subject$ = new Subject();

    // When a user hits either the page number or page size change button, it's necessary to send a request to the backend and process a response.
    // If the user catches to click on any button several times, we can encounter the race condition.
    // It means that the first request can be processed later than the last one. So, we get the wrong data in the UI.
    // The switchMap() operator helps us to avoid such a situation coz it cancels all of the requests except the last one.
    // The backend part gets a CancellationToken requested and a call will be cancelled ASAP.
    subject$
        .pipe(
            tap(_ => { setLoading(true); }),
            switchMap((paging: any) => fromFetch(`${props?.url}?PageNumber=${paging.pageNumber}&PageSize=${paging.perPage}`)),
            concatMap((response: any) => response.json())
        )
        .subscribe({
            next: (launches: any) => {
                setLoading(false);
                setPastLaunches(launches);
            },
            error: (error) => {
                setLoading(false);
            }
        });
    
    const handlePageChange = useCallback((pageNumber: number) => {
        subject$.next({pageNumber, perPage});
    }, []);

    const handlePerRowsChange = async (perPage: number, pageNumber: number) => {

        if(callCounter == 0)
        {
            setcallCounter(1);
            return;
        }

        subject$.next({pageNumber, perPage});
        setPerPage(perPage);
    };
    
    const handleRowClick = (row:any) => {
        // Handle the click event here
        if(props?.upcoming === false)
        {
            navigate(`details/${row.id}`);
        }
      };

    const customStyles = {
        rows: {
            style: {
                minHeight: '60px', // override the row height
                fontSize: '16px',
                fontWeight: 'normal',
                alignItems: 'right',
                cursor: 'pointer'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'right'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                textAlign: 'right'
            },
        },
    };
      
    return (
        <div style={{ alignItems: "right" }}>
            <DataTable
                customStyles={customStyles}
                columns={columns}
                data={pastLaunches?.items}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={pastLaunches?.total}
                paginationPerPage={perPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onRowClicked={handleRowClick}
            />
        </div>
    );
}