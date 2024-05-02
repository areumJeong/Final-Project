import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../css/nav.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useAuthContext } from "../context/AuthContext";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function NavigationBar() {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기
    const [openDrawer, setDrawerOpen] = React.useState(false);
    const [openList, setListOpen] = React.useState(false);
    const { user, logout } = useAuthContext();

    const handleLogout = () => {
        logout(); // 로그아웃 함수 호출
      };

    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };
    const toggleList = (newOpen) => () => {
        setListOpen(newOpen);
    };



    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 기본적으로 로그아웃 상태

    // 추가: 세션 로그인 상태를 확인하고 업데이트하는 함수
    const checkLoginStatus = () => {
        // 세션 로그인 여부를 확인하는 로직
        // 세션이 로그인되어 있다면 setIsLoggedIn(true) 호출
        // 세션이 로그아웃되어 있다면 setIsLoggedIn(false) 호출
    };

    // 추가: 컴포넌트가 처음 마운트될 때 세션 로그인 상태를 확인
    React.useEffect(() => {
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        // 로그아웃 로직 수행
        // 세션 상태를 로그아웃 상태로 변경
        setIsLoggedIn(true);
    };
    // const handleLogout = () => {
    //     // 로그아웃 로직 수행
    //     // 세션 상태를 로그아웃 상태로 변경
    //     setIsLoggedIn(false);
    // };

    // 변경: AccountCircle 아이콘을 세션 로그인 상태에 따라 다르게 렌더링

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <WhatshotIcon />
                        </ListItemIcon>
                        <ListItemText primary="특가" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={toggleList(!openList)}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="카테고리" />
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openList} unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <WhatshotIcon />
                            </ListItemIcon>
                            <ListItemText primary="의자" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <WhatshotIcon />
                            </ListItemIcon>
                            <ListItemText primary="책상" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <WhatshotIcon />
                            </ListItemIcon>
                            <ListItemText primary="책상" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <WhatshotIcon />
                            </ListItemIcon>
                            <ListItemText primary="책상" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <WhatshotIcon />
                            </ListItemIcon>
                            <ListItemText primary="책상" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <Divider />
            <List>
                {['주문내역', '내 정보'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <ShoppingCartIcon /> : <AccountCircle />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const StyledAppBar = styled(AppBar)({
        backgroundColor: 'gray',
        height: '120px',
        justifyContent: 'center',
    });

    // 검색 버튼 클릭 시 실행되는 함수
    const handleSearch = (event) => {
        event.preventDefault(); // 기본 이벤트 방지
        const searchQuery = event.target.elements.search.value.trim(); // 검색어 추출
        if (searchQuery) {
            navigate(`/itemlist/${searchQuery}`); // navigate 함수로 페이지 이동
        }
    };

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <div>
                        <Button onClick={toggleDrawer(true)} color="inherit"><MenuIcon /></Button>
                        <Drawer open={openDrawer} onClose={toggleDrawer(false)} BackdropProps={{invisible: true}}>
                            {DrawerList}
                        </Drawer>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'center', fontWeight: 'bolder' }}
                    >
                        <Link to={'/'} className='mainPageLink'>이건 링크임</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 0.5 }} />
                    <form onSubmit={handleSearch}> 
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                name="search" // 검색어 필드의 이름 설정
                                placeholder="검색"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </form>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={1} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {isLoggedIn ? (
                            <>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xd={4}>
                                        <MenuItem
                                            size="small"
                                            color="inherit"
                                            onClick={handleLogout}
                                        >
                                            <Typography variant="body2">로그아웃</Typography>
                                        </MenuItem>
                                    </Grid>
                                    <Grid item xd={4}>
                                        <MenuItem
                                            size="large"
                                            color="inherit"
                                            onClick={handleLogout}
                                        >
                                            <Typography variant="body2">마이페이지</Typography>
                                        </MenuItem>
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid container alignItems="center" spacing={1}>
                                    <Grid item xd={4}>
                                        <MenuItem
                                            size="small"
                                            color="inherit"
                                            onClick={handleLogin}
                                        >
                                            <Typography variant="body2">로그인</Typography>
                                        </MenuItem>
                                    </Grid>
                                    <Grid item xd={4}>
                                        <MenuItem
                                            size="small"
                                            color="inherit"
                                            onClick={handleLogin}
                                        >
                                            <Typography variant="body2">회원가입</Typography>
                                            <Button variant="outlined" onClick={handleLogout}>로그아웃</Button> {/* 로그아웃 버튼 */}
                                        </MenuItem>
                                    </Grid>
                                </Grid>
                            </>
                        )}

                    </Box>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}