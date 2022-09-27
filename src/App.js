import React from 'react';
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);
    

    const requestSort = key => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = props => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const [list, setList] = React.useState(items);

    const handleRemove= (id) => {
      const choice = window.confirm(
        "Are you sure you want to delete the record?"
      )
      if (choice) {
        // Perform your dangerous critical action here.
      }
    
      const newList = list.filter((item) => item.id !== id);
  
      setList(newList);
    }
  
    return (
        <table border= "3" style={{backgroundColor: "skyblue",width: "500px",textAlign: "center",marginLeft: "500px",marginTop: "20px"}}>
            
            <thead>
                <tr>
                    <th>
                        <span
                            onClick={() => requestSort('id')}
                            className={getClassNamesFor('id')}
                        >
                           ID   
                        </span>
                    </th>
                    <th>
                        <span
                            onClick={() => requestSort('name')}
                            className={getClassNamesFor('name')}
                        >
                            Name
                        </span>
                    </th>
                    <th>
                        <span
                            onClick={() => requestSort('place')}
                            className={getClassNamesFor('place')}
                        >
                            Place
                        </span>
                    </th>
                    <th>
                        <span
                            onClick={() => requestSort('age')}
                            className={getClassNamesFor('age')}
                        >
                            Age
                        </span>
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                {list.map(item => (
                    <tr key={item.id} onDoubleClick={() => handleRemove(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.place}</td>
                        <td>{item.age}</td>
                      
                        
                    </tr>
                    
                ))}
            </tbody>
        </table>
    );
};

export default function App() {
    return (
        <div className="App">
            <ProductTable
                products={[
                    { id: 1, name: 'Harry', place: 'Ludhiana',age: 22},
                    { id: 2, name: 'Sunil', place: 'Ludhiana',age: 22},
                    { id: 3, name: 'Vishal', place:'Ludhiana',age: 21},
                    { id: 4, name: 'Yashraj', place: 'Kashmir',age: 22},
                    { id: 5, name: 'Jassa', place: 'Ludhiana',age: 21},
                    { id: 6, name: 'Yash', place: 'Ludhiana',age: 20},
                    { id: 7, name: 'Vish', place: 'Kashmir',age: 26},
                ]}
            />
        </div>
    );
}
