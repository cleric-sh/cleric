

expect() {
    if [[ $1 == "$2" ]]; then
        echo " - Pass"
    else
        echo " - Fail:"
        echo "   Expected: $2"
        echo "   But was: $1"
    fi    
}